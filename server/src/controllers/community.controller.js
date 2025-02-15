import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Post } from "../models/post.model.js";
import { Community } from "../models/community.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";

// write controller for admin to add admin

// for alumni
const createCommunity = asyncHandler(async (req, res) => {
    if (req.user.role !== "alumni") {
        return res
            .status(403)
            .json({ message: "You are not authorized to create a community" });
    }

    const { name, description, topics } = req.body;

    if (!name || !description || !topics) {
        return res
            .status(400)
            .json({ message: "Name, description and topics are required" });
    }

    let imageLocalPath;
    if (req.file) {
        imageLocalPath = req.file.path;
    }

    const image = await uploadOnCloudinary(imageLocalPath);

    if (!image) {
        return res.status(400).json({ message: "Image is required" });
    }

    const community = await Community.create({
        name,
        description,
        image: image.url,
        admins: [req.user._id],
        topics,
    });

    await User.findByIdAndUpdate(req.user._id, {
        $push: { communities: community._id },
    });

    return res
        .status(201)
        .json(
            new ApiResponse(201, community, "Community created successfully")
        );
});

// remove member from community
const removeMemberFromCommunity = asyncHandler(async (req, res) => {
    if (req.user.role !== "alumni") {
        return res
            .status(403)
            .json({ message: "You are not authorized to remove a member" });
    }

    const { communityId, memberId } = req.params;

    const community = await Community.findById(communityId);

    if (!community) {
        return res.status(404).json({ message: "Community not found" });
    }

    if (!community.admins.includes(req.user._id)) {
        return res
            .status(403)
            .json({ message: "You are not authorized to remove a member" });
    }

    const user = await User.findById(memberId);

    if (!community.members.includes(memberId)) {
        return res
            .status(404)
            .json({ message: "Member not found in the community" });
    }

    community.members.pull(memberId);
    user.communities.pull(communityId);
    await community.save({ validateBeforeSave: false });
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Member removed successfully"));
});

// for all
const joinCommunity = asyncHandler(async (req, res) => {
    const { communityId } = req.params;

    const community = await Community.findById(communityId);

    if (!community) {
        return res.status(404).json({ message: "Community not found" });
    }

    const user = await User.findById(req.user._id);

    if (community.members.includes(req.user._id)) {
        return res
            .status(400)
            .json({ message: "You are already a member of this community" });
    }

    community.members.push(req.user._id);
    user.communities.push(communityId);
    await community.save({ validateBeforeSave: false });
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "You have joined the community successfully"
            )
        );
});

// get community members
const getCommunityMembers = asyncHandler(async (req, res) => {
    const { communityId } = req.params;

    const community = await Community.findById(communityId).populate("members");

    return res
        .status(200)
        .json(
            new ApiResponse(200, community.members, "Community members fetched")
        );
});

// get community admins
const getCommunityAdmins = asyncHandler(async (req, res) => {
    const { communityId } = req.params;

    const community = await Community.findById(communityId).populate("admins");

    return res
        .status(200)
        .json(
            new ApiResponse(200, community.admins, "Community admins fetched")
        );
});

// get community details
const getCommunity = asyncHandler(async (req, res) => {
    const { communityId } = req.params;

    const community = await Community.findById(communityId).populate("posts");

    return res
        .status(200)
        .json(new ApiResponse(200, community, "Community details fetched"));
});

// get joined communities for a user
const getJoinedCommunities = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate("communities");

    return res
        .status(200)
        .json(
            new ApiResponse(200, user.communities, "Joined communities fetched")
        );
});

// get not joined communities for a user
const getNotJoinedCommunities = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate("communities");

    const communities = await Community.find({});

    const notJoinedCommunities = communities.filter(
        (community) => !user.communities.includes(community._id)
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                notJoinedCommunities,
                "Not joined communities fetched"
            )
        );
});

// create community post
const createCommunityPost = asyncHandler(async (req, res) => {
    const { communityId } = req.params;
    const owner = req.user._id;

    const { title, content } = req.body;

    if (!title || !content) {
        return res
            .status(400)
            .json({ message: "Title and content is required" });
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
            owner,
            image: image.url,
            community: communityId,
        });
    } else {
        post = await Post.create({
            title,
            content,
            owner,
            community: communityId,
        });
    }

    return res
        .status(201)
        .json(new ApiResponse(201, post, "Post created successfully"));
});

// like community post
const likeCommunityPost = asyncHandler(async (req, res) => {
    const { communityId, postId } = req.params;

    const community = await Community.findById(communityId);

    if (!community) {
        return res.status(404).json({ message: "Community not found" });
    }

    const post = await Post.findById(postId);

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    if (post.likes.includes(req.user._id)) {
        return res.status(400).json({ message: "You already liked this post" });
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

// unlike community post
const unlikeCommunityPost = asyncHandler(async (req, res) => {
    const { communityId, postId } = req.params;

    const community = await Community.findById(communityId);

    if (!community) {
        return res.status(404).json({ message: "Community not found" });
    }

    const post = await Post.findById(postId);

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    if (!post.likes.includes(req.user._id)) {
        return res
            .status(400)
            .json({ message: "You have not liked this post" });
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

// create comment on community post
const createCommunityComment = asyncHandler(async (req, res) => {
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

export {
    createCommunity,
    removeMemberFromCommunity,
    joinCommunity,
    getCommunityMembers,
    getCommunityAdmins,
    getCommunity,
    getJoinedCommunities,
    getNotJoinedCommunities,
    createCommunityPost,
    likeCommunityPost,
    unlikeCommunityPost,
    createCommunityComment,
};
