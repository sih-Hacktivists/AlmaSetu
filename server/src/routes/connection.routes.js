import {
    createConnection,
    acceptConnection,
    rejectConnection,
    isConnection,
    getConnections,
    getPendingRequests,
    getPendingApprovals,
} from "../controllers/connection.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.use(verifyJWT);

router.post("/create/:connectionId", createConnection);
router.put("/accept/:connectionId", acceptConnection);
router.delete("/reject/:connectionId", rejectConnection);
router.get("/is-connection/:connectionId", isConnection);
router.get("/", getConnections);
router.get("/pending-requests", getPendingRequests);
router.get("/pending-approvals", getPendingApprovals);

export default router;
