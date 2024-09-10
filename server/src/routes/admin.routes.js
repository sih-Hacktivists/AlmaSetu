import {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    refreshAccessToken,
    getCurrentAdmin,
    createEvent,
    getCollegeEvents,
    getAdminEvents,
    getVerifiedCollegeStudents,
    getVerifiedCollegeAlumni,
    getUnverifiedCollegeStudents,
    getUnverifiedCollegeAlumni,
    getAllUnverifiedCollegeUsers,
    approveUser,
    rejectUser,
} from "../controllers/admin.controller.js";
import { verifyAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { Router } from "express";
const router = Router();

router.route("/register").post(registerAdmin);
router.route("/login").post(loginAdmin);

// secure routes
router.route("/logout").post(verifyAdmin, logoutAdmin);
router.route("/refresh-token").post(verifyAdmin, refreshAccessToken);
router.route("/current").get(verifyAdmin, getCurrentAdmin);
router
    .route("/create-event")
    .post(verifyAdmin, upload.single("image"), createEvent);
router.route("/college-events").get(verifyAdmin, getCollegeEvents);
router.route("/admin-events").get(verifyAdmin, getAdminEvents);

router.route("/verified-students").get(verifyAdmin, getVerifiedCollegeStudents);
router.route("/verified-alumni").get(verifyAdmin, getVerifiedCollegeAlumni);
router
    .route("/unverified-students")
    .get(verifyAdmin, getUnverifiedCollegeStudents);
router.route("/unverified-alumni").get(verifyAdmin, getUnverifiedCollegeAlumni);
router
    .route("/unverified-users")
    .get(verifyAdmin, getAllUnverifiedCollegeUsers);

router.route("/approve-user/:userId").put(verifyAdmin, approveUser);
router.route("/reject-user/:userId").delete(verifyAdmin, rejectUser);

export default router;
