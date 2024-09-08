import {
    register,
    verifyEmail,
    login,
    logout,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateProfilePic,
    getUserProfile,
    allUsers,
    giveRecomendation,
    sendPasswordResetEmail,
    resetPassword,
    checkWhetherEmailOrPhoneExists,
    checkWhetherEnrollmentExists,
} from "../controllers/user.controller.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
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
router.route("/:userId/verify-email/:token").get(verifyEmail);
router.route("/login").post(login);

router.route("/u/:userId").get(getUserProfile);

router.route("/check-email-or-phone").post(checkWhetherEmailOrPhoneExists);
router.route("/check-enrollment").post(checkWhetherEnrollmentExists);

// secure routes
router.route("/logout").post(verifyJWT, logout);
router.route("/refresh-token").post(verifyJWT, refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/me").get(verifyJWT, getCurrentUser);
router
    .route("/update-profile-pic")
    .post(verifyJWT, upload.single("profilePic"), updateProfilePic);

router.route("/").get(verifyJWT, allUsers);

router
    .route("/get-recommendations/:studentId")
    .get(verifyJWT, giveRecomendation);

router.route("/send-password-reset-email").post(sendPasswordResetEmail);
router.route("/:userId/reset-password/:token").post(resetPassword);

export default router;
