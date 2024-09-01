import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

export const Topic = mongoose.model("Topic", topicSchema);
