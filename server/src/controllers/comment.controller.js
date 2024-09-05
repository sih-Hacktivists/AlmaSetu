import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Comment } from "../models/comment.model.js";

// create comment
const createComment = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ message: "Content is required" });
    }

    const comment = await Comment.create({
        content,
        owner: req.user._id,
        post: postId,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, comment, "Comment created successfully"));
});

export { createComment };
