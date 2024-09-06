import {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    refreshAccessToken,
    createEvent,
    getCollegeEvents,
    getAdminEvents,
    getVerifiedCollegeStudents,
    getVerifiedCollegeAlumni,
    getUnverifiedCollegeStudents,
    getUnverifiedCollegeAlumni,
    approveStudent,
    approveAlumni,
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
router.route("/approve-student/:studentId").put(verifyAdmin, approveStudent);
router.route("/approve-alumni/:alumniId").put(verifyAdmin, approveAlumni);

export default router;
