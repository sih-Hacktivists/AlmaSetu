import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import axios from "axios";
import {
    deleteFromCloudinary,
    uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import { Token } from "../models/token.model.js";
import { nodemailerTransport as sendEmail } from "../utils/Nodemailer.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        return res.status(500).json({
            message:
                "Something went wrong while genrating refresh and access token",
        });
    }
};

const register = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        enrollmentNumber,
        phone,
        role,
        city,
        college,
        isCollegeEmail,
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
        !enrollmentNumber ||
        !phone ||
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
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    const existingUser = await User.findOne({
        $or: [{ email }, { enrollmentNumber }, { phone }],
    });

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    let profilePicLocalPath;
    if (req.files.profilePic) {
        profilePicLocalPath = req.files.profilePic[0].path;
    }

    const profilePic = await uploadOnCloudinary(profilePicLocalPath);

    console.log(profilePicLocalPath);

    if (!profilePic) {
        return res.status(400).json({ message: "Profile pic is required" });
    }

    let documentLocalPath;
    if (req.files.document) {
        documentLocalPath = req.files.document[0].path;
    }

    console.log(documentLocalPath);

    const document = await uploadOnCloudinary(documentLocalPath);

    const user = await User.create({
        name,
        email,
        enrollmentNumber,
        phone,
        role: role.toLowerCase(),
        city,
        college,
        isCollegeEmail,
        bio,
        branch,
        yearOfGraduation,
        specialization,
        interests,
        skills,
        password,
        profilePic: profilePic.url,
        document: document?.url || "",
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        return res
            .status(500)
            .json({ message: "Something went wrong while creating user" });
    }

    if (createdUser.isCollegeEmail) {
        const token = await Token.create({
            userId: createdUser._id,
            token: jwt.sign(
                { _id: createdUser._id },
                process.env.VERIFY_EMAIL_TOKEN_SECRET,
                {
                    expiresIn: "1d",
                }
            ),
        });

        const url = `${process.env.BASE_URL}/users/${createdUser._id}/verify-email/${encodeURIComponent(token.token)}`;
        await sendEmail(createdUser.email, "Verify Email", url);

        return res
            .status(201)
            .json(
                new ApiResponse(
                    200,
                    createdUser,
                    "An email has been sent please verify your email. Also check spam folder if you don't see it in inbox"
                )
            );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                createdUser,
                "Your details have been submitted successfully"
            )
        );
});

const verifyEmail = asyncHandler(async (req, res) => {
    const { userId, token } = req.params;

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const hasToken = await Token.findOne({ userId, token });

    if (!hasToken) {
        return res.status(404).json({ message: "Invalid link" });
    }

    await User.findByIdAndUpdate(userId, { isVerified: true }, { new: true });
    await Token.findOneAndDelete({ userId, token }, { new: true });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Email verified successfully!! Now you can Login"
            )
        );
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "email or password is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid Password" });
    }

    if (user.isCollegeEmail && !user.isVerified) {
        let token = await Token.findOne({ userId: user._id });

        if (!token) {
            token = await Token.create({
                userId: user._id,
                token: jwt.sign(
                    { _id: user._id },
                    process.env.VERIFY_EMAIL_TOKEN_SECRET,
                    {
                        expiresIn: "1d",
                    }
                ),
            });
        }

        const url = `${process.env.BASE_URL}/users/${user._id}/verify-email/${token.token}`;
        await sendEmail(user.email, "Verify Email", url);

        return res.status(400).json({
            message:
                "Please verify your email to login. Also check spam folder if you don't see it in inbox",
        });
    }

    if (!user.isVerified) {
        return res
            .status(400)
            .json({ message: "Please wait for your approval from admin" });
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
        return res.status(401).json({ message: "Unauthorized request" });
    }

    try {
        const decodedToken = jwt.verify(
            incommingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        if (incommingRefreshToken !== user?.refreshToken) {
            return res
                .status(401)
                .json({ message: "Refresh token is expired or used" });
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
        return res
            .status(401)
            .json({ message: error?.message || "Invalid refresh token" });
    }
});

const checkWhetherEmailOrPhoneExists = asyncHandler(async (req, res) => {
    const { email, phone } = req.body;

    const existingUser = await User.findOne({
        $or: [{ email }, { phone }],
    });

    if (existingUser) {
        return res
            .status(400)
            .json({ message: "User with this email or phone already exists" });
    }

    return res.status(200).json(new ApiResponse(200, {}, "User not found"));
});

const checkWhetherEnrollmentExists = asyncHandler(async (req, res) => {
    const { enrollmentNumber } = req.body;

    const existingUser = await User.findOne({ enrollmentNumber });

    if (existingUser) {
        return res.status(400).json({
            message: "User with this enrollment number already exists",
        });
    }

    return res.status(200).json(new ApiResponse(200, {}, "User not found"));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id);

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid Password" });
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
        return res.status(400).json({ message: "Profile pic is required" });
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
        return res
            .status(400)
            .json({ message: "Error while uploading Profile pic" });
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
        return res.status(404).json({ message: "User not found" });
    }

    return res
        .status(200)
        .json(new ApiResponse(200, user, "User fetched successfully"));
});

const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
        ? {
              $or: [
                  { name: { $regex: req.query.search, $options: "i" } },
                  { email: { $regex: req.query.search, $options: "i" } },
              ],
          }
        : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
});

const giveRecomendation = asyncHandler(async (req, res) => {
    const studentId = req.params.studentId;

    try {
        const response = await axios.get(
            `${process.env.FLASK_API_URL}/recommend/${studentId}`
        );

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    response.data,
                    "Recommendations fetched successfully"
                )
            );
    } catch (error) {
        console.error("Error calling Flask API:", error.message);
        return res
            .status(500)
            .json({ message: "Failed to get recommendations" });
    }
});

const sendPasswordResetEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const token = await Token.create({
        userId: user._id,
        token: jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_SECRET, {
            expiresIn: "1d",
        }),
    });

    const url = `${process.env.BASE_URL}/users/${user._id}/reset-password/${token.token}`;

    await sendEmail(user.email, "Password Reset Link", url);

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Password reset link sent successfully")
        );
});

const resetPassword = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { password } = req.body;

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    user.password = password;
    await user.save({ validateBeforeSave: false });

    await Token.findOneAndDelete({ userId });

    await User.findByIdAndUpdate(
        userId,
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
        .json({ message: "Password reset successfully" });
});

export {
    allUsers,
    register,
    verifyEmail,
    login,
    logout,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateProfilePic,
    getUserProfile,
    giveRecomendation,
    sendPasswordResetEmail,
    resetPassword,
    checkWhetherEmailOrPhoneExists,
    checkWhetherEnrollmentExists,
};
