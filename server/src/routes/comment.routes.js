import { createComment } from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router();

router.use(verifyJWT);

router.route("/:postId/create-comment").post(createComment);

export default router;
