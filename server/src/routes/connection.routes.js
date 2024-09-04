import {
    createConnection,
    acceptConnection,
    rejectConnection,
    getConnections,
} from "../controllers/connection.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.use(verifyJWT);

router.post("/create", createConnection);
router.put("/accept/:connectionId", acceptConnection);
router.put("/reject/:connectionId", rejectConnection);
router.get("/", getConnections);

export default router;
