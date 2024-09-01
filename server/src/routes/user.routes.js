import {
    register,
    login,
    getAllStudents,
    getAllAlumni,
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

router.route("/students").get(getAllStudents); // have to delete this route
router.route("/alumni").get(getAllAlumni); // have to delete this route

export default router;
