import {
    createPost,
    likePost,
    unlikePost,
} from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router();

router.use(verifyJWT);

router.route("/create").post(createPost);
router.route("/:postId/like").post(likePost);
router.route("/:postId/unlike").post(unlikePost);

export default router;
