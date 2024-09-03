import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Post } from "../models/post.model.js";
import { Community } from "../models/community.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";

// for alumni
const createCommunity = asyncHandler(async (req, res) => {
    if (req.user.role !== "alumni") {
        throw new ApiError(403, "You are not authorized to create a community");
    }

    const { name, description, topics } = req.body;

    if (!name || !description || !topics) {
        throw new ApiError(400, "Name, description and topics are required");
    }

    let imageLocalPath;
    if (req.file) {
        imageLocalPath = req.file.path;
    }

    const image = await uploadOnCloudinary(imageLocalPath);

    if (!image) {
        throw new ApiError(500, "Image file is required");
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
        throw new ApiError(403, "You are not authorized to remove a member");
    }

    const { communityId, memberId } = req.params;

    const community = await Community.findById(communityId);

    if (!community) {
        throw new ApiError(404, "Community not found");
    }

    if (!community.admins.includes(req.user._id)) {
        throw new ApiError(403, "You are not authorized to remove a member");
    }

    const user = await User.findById(memberId);

    if (!community.members.includes(memberId)) {
        throw new ApiError(404, "Member not found in the community");
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
        throw new ApiError(404, "Community not found");
    }

    const user = await User.findById(req.user._id);

    if (community.members.includes(req.user._id)) {
        throw new ApiError(400, "You are already a member of this community");
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

// create post in community
const createCommunityPost = asyncHandler(async (req, res) => {
    const { communityId } = req.params;
    const owner = req.user._id;

    const { title, content } = req.body;

    if (!title || !content) {
        throw new ApiError(400, "Title and content is required");
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

// write controller for admin to add admin

export {
    createCommunity,
    removeMemberFromCommunity,
    joinCommunity,
    createCommunityPost,
    getCommunityMembers,
    getCommunityAdmins,
    getCommunity,
    getJoinedCommunities,
    getNotJoinedCommunities,
};
