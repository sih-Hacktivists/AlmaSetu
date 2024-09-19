import {
    getNotifications,
    readNotification,
    deleteNotifiaction,
} from "../controllers/notification.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router();

router.use(verifyJWT);

router.route("/").get(getNotifications);
router.route("/read/:notificationId").put(readNotification);
router.route("/delete/:notificationId").delete(deleteNotifiaction);

export default router;
