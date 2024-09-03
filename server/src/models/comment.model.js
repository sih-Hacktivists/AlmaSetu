import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
});

export const Comment = mongoose.model("Comment", commentSchema);
