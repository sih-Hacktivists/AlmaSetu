import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        startTime: {
            type: String,
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        registeredMembers: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        college: {
            type: String,
            required: true,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
