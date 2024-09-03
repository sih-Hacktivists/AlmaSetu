import {
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
} from "../controllers/community.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router();

router.use(verifyJWT);

router.route("/create").post(createCommunity);
router
    .route("/:communityId/remove-member/:memberId")
    .post(removeMemberFromCommunity);
router.route("/:communityId/join").post(joinCommunity);
router.route("/:communityId/members").get(getCommunityMembers);
router.route("/:communityId/admins").get(getCommunityAdmins);
router.route("/:communityId").get(getCommunity);
router.route("/joined").get(getJoinedCommunities);
router.route("/not-joined").get(getNotJoinedCommunities);
router.route("/:communityId/create-post").post(createCommunityPost);
router.route("/:communityId/:postId/like-post").post(likeCommunityPost);
router.route("/:communityId/:postId/unlike-post").post(unlikeCommunityPost);

export default router;
