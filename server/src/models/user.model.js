import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        enrollment: {
            type: String,
            required: true,
            trim: true,
        },
        contact: {
            type: String,
            required: true,
            trim: true,
        },
        role: {
            type: String,
            enum: ["student", "alumni"],
            required: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        college: {
            type: String,
            required: true,
        },
        bio: {
            type: String,
            required: true,
            trim: true,
        },
        profilePic: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        interests: {
            type: [String],
            required: true,
        },
        skills: {
            type: [String],
            required: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        branch: {
            type: String,
            required: true,
        },
        yearOfGraduation: {
            type: Number,
            required: true,
        },
        specialization: {
            type: String,
            required: true,
        },
        achievements: {
            type: [String],
        },
        socialLinks: {
            type: [String],
        },
        workExperience: {
            type: [
                {
                    company: String,
                    role: String,
                    startDate: Date,
                    endDate: Date,
                    present: Boolean,
                },
            ],
        },
        document: {
            type: String,
            default: "",
        },
        events: [
            {
                type: Schema.Types.ObjectId,
                ref: "event",
            },
        ],
        communities: [
            {
                type: Schema.Types.ObjectId,
                ref: "community",
            },
        ],
        likedPosts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            email: this.email,
            enrollment: this.enrollment,
            contact: this.contact,
            role: this.role,
            college: this.college,
            isVerified: this.isVerified,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

export const User = mongoose.model("User", userSchema);