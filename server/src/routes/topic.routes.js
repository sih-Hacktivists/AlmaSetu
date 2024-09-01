import { createTopic, getTopics } from "../controllers/topic.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.use(verifyJWT); // Protect all routes in this file

router.route("/create").post(createTopic);
router.route("/").get(getTopics);

export default router;
