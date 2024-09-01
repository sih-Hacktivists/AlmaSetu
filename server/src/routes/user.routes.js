import {
    register,
    login,
    logout,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateProfilePic,
    getUserProfile,
} from "../controllers/user.controller.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "profilePic",
            maxCount: 1,
        },
        {
            name: "document",
            maxCount: 1,
        },
    ]),
    register
);
router.route("/login").post(login);

router.route("/:userId").get(getUserProfile);

// secure routes
router.route("/logout").post(logout);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(changeCurrentPassword);
router.route("/me").get(getCurrentUser);
router
    .route("/update-profile-pic")
    .post(upload.single("profilePic"), updateProfilePic);

export default router;
