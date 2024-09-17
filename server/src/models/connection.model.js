import mongoose, { Schema } from "mongoose";

const connectionSchema = new Schema(
    {
        connectFrom: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        connectTo: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        isAccepted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Connection = mongoose.model("Connection", connectionSchema);
