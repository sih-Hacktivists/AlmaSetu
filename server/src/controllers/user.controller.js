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
        college,
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
        !college ||
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
        college,
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

const logout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: { refreshToken: 1 }, // this removes the field from the document
        },
        { new: true }
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incommingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;

    if (!incommingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(
            incommingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(404, "Invalid refresh token");
        }

        if (incommingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used");
        }

        const options = {
            httpOnly: true,
            secure: true,
        };

        const { accessToken, refreshToken } =
            await generateAccessAndRefreshTokens(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken,
                        refreshToken,
                    },
                    "Access token refreshed successfully"
                )
            );
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id);

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid Password");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password updated successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

const updateProfilePic = asyncHandler(async (req, res) => {
    let profilePicLocalPath;

    console.log(req.file);

    if (req.file) {
        profilePicLocalPath = req.file.path;
    }

    if (!profilePicLocalPath) {
        throw new ApiError(400, "Profile pic file is required");
    }

    console.log(profilePicLocalPath);

    if (req.user?.profilePic) {
        const oldLink = req.user.profilePic.split("/");
        const publicId = oldLink[oldLink.length - 1].split(".")[0];
        console.log(publicId);
        await deleteFromCloudinary(publicId);
    }

    const profilePic = await uploadOnCloudinary(profilePicLocalPath);

    if (!profilePic.url) {
        throw new ApiError(400, "Error while uploading Profile pic");
    }

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { profilePic: profilePic.url },
        },
        { new: true }
    );

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Profile pic updated successfully"));
});

const getUserProfile = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("events communities");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, user, "User fetched successfully"));
});

export {
    register,
    login,
    logout,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateProfilePic,
    getUserProfile,
};
