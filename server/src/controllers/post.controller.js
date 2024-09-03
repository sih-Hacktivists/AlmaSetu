import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Post } from "../models/post.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";

// create post
const createPost = asyncHandler(async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        throw new ApiError(400, "Tittle and Content are required");
    }

    let imageLocalPath;
    if (req.file) {
        imageLocalPath = req.file.path;
    }

    const image = await uploadOnCloudinary(imageLocalPath);

    let post;
    if (image) {
        post = await Post.create({
            title,
            content,
            image: image.url,
            owner: req.user._id,
        });
    } else {
        post = await Post.create({
            title,
            content,
            owner: req.user._id,
        });
    }

    return res
        .status(201)
        .json(new ApiResponse(201, post, "Post created successfully"));
});

// like post
const likePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    if (post.likes.includes(req.user._id)) {
        throw new ApiError(400, "You already liked this post");
    }

    post.likes.push(req.user._id);
    await post.save({ validateBeforeSave: false });

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $push: { likedPosts: postId },
        },
        { new: true }
    );

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Post liked successfully"));
});

// unlike post
const unlikePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    if (!post.likes.includes(req.user._id)) {
        throw new ApiError(400, "You have not liked this post");
    }

    post.likes.pull(req.user._id);
    await post.save({ validateBeforeSave: false });

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $pull: { likedPosts: postId },
        },
        { new: true }
    );

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Post unliked successfully"));
});

export { createPost, likePost, unlikePost };
