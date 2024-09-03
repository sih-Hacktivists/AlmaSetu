import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    college: {
        type: String,
        required: true,
        trim: true,
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
});

export const Admin = mongoose.model("Admin", adminSchema);
