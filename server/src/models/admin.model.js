import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    role: {
        type: String,
        required: true,
        trim: true,
        enum: ["admin", "superadmin"],
    },
    college: {
        type: String,
        trim: true,
        default: "",
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    events: [
        {
            type: Schema.Types.ObjectId,
            ref: "Event",
        },
    ],
    refreshToken: {
        type: String,
    },
});

adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

adminSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

adminSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: this.role,
            college: this.college,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

adminSchema.methods.generateRefreshToken = function () {
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

export const Admin = mongoose.model("Admin", adminSchema);
