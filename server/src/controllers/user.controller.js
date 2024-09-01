import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import {
    deleteFromCloudinary,
    uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while genrating refresh and access token"
        );
    }
};

const register = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        enrollment,
        contact,
        role,
        city,
        university,
        bio,
        branch,
        yearOfGraduation,
        specialization,
        interests,
        skills,
        password,
    } = req.body;

    if (
        !name ||
        !email ||
        !enrollment ||
        !contact ||
        !role ||
        !city ||
        !university ||
        !bio ||
        !branch ||
        !yearOfGraduation ||
        !specialization ||
        !interests ||
        !skills ||
        !password
    ) {
        throw new ApiError(400, "Please fill all the fields");
    }

    const existingUser = await User.findOne({
        $or: [{ email }, { enrollment }, { contact }],
    });

    if (existingUser) {
        throw new ApiError(400, "User already exists");
    }

    let profilePicLocalPath;
    if (req.files.profilePic) {
        profilePicLocalPath = req.files.profilePic[0].path;
    }

    const profilePic = await uploadOnCloudinary(profilePicLocalPath);

    if (!profilePic) {
        throw new ApiError(500, "Profile pic file is required");
    }

    let documentLocalPath;
    if (req.files.document) {
        documentLocalPath = req.files.document[0].path;
    }

    const document = await uploadOnCloudinary(documentLocalPath);

    const user = await User.create({
        name,
        email,
        enrollment,
        contact,
        role,
        city,
        university,
        bio,
        branch,
        yearOfGraduation,
        specialization,
        interests,
        skills,
        password,
        profilePic: profilePic.url,
        document: document.url || "",
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating user");
    }

    return res
        .status(201)
        .json(new ApiResponse(200, createdUser, "User created successfully"));
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "email or password is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User does not exists");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user Credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        user._id
    );

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, loggedInUser, "User logged In Successfully")
        );
});

// have to delete
const getAllStudents = asyncHandler(async (req, res) => {
    const students = await User.find({ role: "student" }).select(
        "-password -refreshToken"
    );

    if (!students) {
        throw new ApiError(404, "No students found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, students, "Students fetched successfully"));
});

// have to delete
const getAllAlumni = asyncHandler(async (req, res) => {
    const alumni = await User.find({ role: "alumni" }).select(
        "-password -refreshToken"
    );

    if (!alumni) {
        throw new ApiError(404, "No alumni found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, alumni, "Alumni fetched successfully"));
});

export { register, login, getAllStudents, getAllAlumni };
