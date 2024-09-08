import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Admin } from "../models/admin.model.js";
import { User } from "../models/user.model.js";
import { deleteFromCloudinary } from "../utils/cloudinary.js";

const generateAccessAndRefreshTokens = async (adminId) => {
    try {
        const admin = await Admin.findById(adminId);
        const accessToken = admin.generateAccessToken();
        const refreshToken = admin.generateRefreshToken();

        admin.refreshToken = refreshToken;
        await admin.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        return res.status(500).json({
            message:
                "Something went wrong while genrating refresh and access token",
        });
    }
};

// for both
const registerAdmin = asyncHandler(async (req, res) => {
    const { email, password, role, college } = req.body;

    if (!email || !password || !role) {
        return res
            .status(400)
            .json({ message: "Please provide all the required fields" });
    }

    if (role === "admin" && !college) {
        return res.status(400).json({ message: "Please provide college name" });
    }

    const checkIfInUser = await User.findOne({ email });

    if (checkIfInUser) {
        return res.status(400).json({ message: "Email already exists" });
    }

    const existingUser = await Admin.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
    }

    const admin = await Admin.create({
        email,
        password,
        role: role.toLowerCase(),
        college,
    });

    const createdAdmin = await Admin.findById(admin._id).select(
        "-password -refreshToken"
    );

    return res
        .status(200)
        .json(
            new ApiResponse(200, createdAdmin, "Admin registered successfully")
        );
});

const loginAdmin = asyncHandler(async (req, res) => {
    const { role, email, password } = req.body;

    if (!email || !password || !role) {
        return res
            .status(400)
            .json({ message: "Please provide all the required fields" });
    }

    const admin = await Admin.findOne({ email, role: role.toLowerCase() });

    if (!admin) {
        return res.status(404).json({ message: `${role} not found` });
    }

    const isPasswordCorrect = await admin.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        admin._id
    );

    const loggedInAdmin = await Admin.findById(admin._id).select(
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
            new ApiResponse(200, loggedInAdmin, "User logged In Successfully")
        );
});

const logoutAdmin = asyncHandler(async (req, res) => {
    await Admin.findByIdAndUpdate(
        req.admin._id,
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
        .json(new ApiResponse(200, {}, "Admin logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incommingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;

    if (!incommingRefreshToken) {
        return res.status(401).json({ message: "Unauthorized request" });
    }

    try {
        const decodedToken = jwt.verify(
            incommingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const admin = await Admin.findById(decodedToken?._id);

        if (!admin) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        if (incommingRefreshToken !== admin?.refreshToken) {
            return res
                .status(401)
                .json({ message: "Refresh token is expired or used" });
        }

        const options = {
            httpOnly: true,
            secure: true,
        };

        const { accessToken, refreshToken } =
            await generateAccessAndRefreshTokens(admin._id);

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
        return res
            .status(401)
            .json({ message: error?.message || "Invalid refresh token" });
    }
});

// for college admin
const createEvent = asyncHandler(async (req, res) => {
    if (req.admin.role !== "admin") {
        return res
            .status(401)
            .json({ message: "You are not authorized to create an event" });
    }

    const { title, description, startDate, endDate, startTime } = req.body;

    if (!title || !description || !startDate || !endDate || !startTime) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const college = req.admin.college;

    let imageLocalPath;
    if (req.file) {
        imageLocalPath = req.file.path;
    }

    const image = await uploadOnCloudinary(imageLocalPath);

    if (!image) {
        return res.status(500).json({ message: "Image is required" });
    }

    const event = await Event.create({
        owner: req.admin._id,
        title,
        description,
        startDate,
        endDate,
        startTime,
        college,
        image: image.url,
    });

    await Admin.findByIdAndUpdate(
        req.admin._id,
        {
            $push: { events: event._id },
        },
        { new: true }
    );

    return res
        .status(201)
        .json(new ApiResponse(201, "Event created successfully", event));
});

const getCollegeEvents = asyncHandler(async (req, res) => {
    if (req.admin.role !== "admin") {
        return res
            .status(401)
            .json({ message: "You are not authorized to view events" });
    }

    const events = await Event.find({ college: req.admin.college });

    return res
        .status(200)
        .json(new ApiResponse(200, events, "Events fetched successfully"));
});

const getAdminEvents = asyncHandler(async (req, res) => {
    if (req.admin.role !== "admin") {
        return res
            .status(401)
            .json({ message: "You are not authorized to view events" });
    }

    const events = await Event.find({ owner: req.admin._id });

    return res
        .status(200)
        .json(new ApiResponse(200, events, "Events fetched successfully"));
});

const getVerifiedCollegeStudents = asyncHandler(async (req, res) => {
    if (req.admin.role !== "admin") {
        return res
            .status(401)
            .json({ message: "You are not authorized to view students" });
    }

    const students = await User.find({
        college: req.admin.college,
        role: "student",
        isVerified: true,
    }).sort({ updatedAt: -1 });

    return res
        .status(200)
        .json(new ApiResponse(200, students, "Students fetched successfully"));
});

const getVerifiedCollegeAlumni = asyncHandler(async (req, res) => {
    if (req.admin.role !== "admin") {
        return res
            .status(401)
            .json({ message: "You are not authorized to view alumni" });
    }

    const alumni = await User.find({
        college: req.admin.college,
        role: "alumni",
        isVerified: true,
    }).sort({ updatedAt: -1 });

    return res
        .status(200)
        .json(new ApiResponse(200, alumni, "Alumni fetched successfully"));
});

const getUnverifiedCollegeStudents = asyncHandler(async (req, res) => {
    if (req.admin.role !== "admin") {
        return res
            .status(401)
            .json({ message: "You are not authorized to view students" });
    }

    const students = await User.find({
        college: req.admin.college,
        role: "student",
        isVerified: false,
        isCollegeEmail: false,
    }).sort({ createdAt: 1 });

    return res
        .status(200)
        .json(new ApiResponse(200, students, "Students fetched successfully"));
});

const getUnverifiedCollegeAlumni = asyncHandler(async (req, res) => {
    if (req.admin.role !== "admin") {
        return res
            .status(401)
            .json({ message: "You are not authorized to view alumni" });
    }

    const alumni = await User.find({
        college: req.admin.college,
        role: "alumni",
        isVerified: false,
        isCollegeEmail: false,
    }).sort({ createdAt: 1 });

    return res
        .status(200)
        .json(new ApiResponse(200, alumni, "Alumni fetched successfully"));
});

const getAllUnverifiedCollegeUsers = asyncHandler(async (req, res) => {
    if (req.admin.role !== "admin") {
        return res
            .status(401)
            .json({ message: "You are not authorized to view users" });
    }

    const users = await User.find({
        college: req.admin.college,
        isVerified: false,
        isCollegeEmail: false,
    }).sort({ createdAt: 1 });

    return res
        .status(200)
        .json(new ApiResponse(200, users, "Users fetched successfully"));
});

const approveUser = asyncHandler(async (req, res) => {
    if (req.admin.role !== "admin") {
        return res
            .status(401)
            .json({ message: "You are not authorized to approve a user" });
    }

    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (user.college !== req.admin.college) {
        return res.status(400).json({ message: "Invalid college" });
    }

    user.isVerified = true;
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, user, "User approved successfully"));
});

const rejectUser = asyncHandler(async (req, res) => {
    if (req.admin.role !== "admin") {
        return res
            .status(401)
            .json({ message: "You are not authorized to reject a user" });
    }

    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (user.college !== req.admin.college) {
        return res.status(400).json({ message: "Invalid college" });
    }

    if (user.profilePic) {
        const oldLink = user.profilePic.split("/");
        const publicId = oldLink[oldLink.length - 1].split(".")[0];
        console.log(publicId);
        await deleteFromCloudinary(publicId);
    }

    if (user.document) {
        const oldLink = user.document.split("/");
        const publicId = oldLink[oldLink.length - 1].split(".")[0];
        console.log(publicId);
        await deleteFromCloudinary(publicId);
    }

    await User.findByIdAndDelete(userId);

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "User rejected successfully"));
});

export {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    refreshAccessToken,
    createEvent,
    getCollegeEvents,
    getAdminEvents,
    getVerifiedCollegeStudents,
    getVerifiedCollegeAlumni,
    getUnverifiedCollegeStudents,
    getUnverifiedCollegeAlumni,
    getAllUnverifiedCollegeUsers,
    approveUser,
    rejectUser,
};
