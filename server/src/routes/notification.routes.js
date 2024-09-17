import {
    getNotifications,
    deleteNotifiaction,
} from "../controllers/notification.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router();

router.use(verifyJWT);

router.get("/", getNotifications);
router.delete("/delete/:notificationId", deleteNotifiaction);

export default router;
