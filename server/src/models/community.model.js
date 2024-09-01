import mongoose, { Schema } from "mongoose";

const communitySchema = new Schema(
    {
        name: {
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
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        topics: [
            {
                type: Schema.Types.ObjectId,
                ref: "Topic",
            },
        ],
        admins: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
    },
    { timestamps: true }
);

export const Community = mongoose.model("Community", communitySchema);
