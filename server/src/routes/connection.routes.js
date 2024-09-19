import {
    createConnection,
    acceptConnection,
    rejectConnection,
    connectionStatus,
    getConnections,
    getPendingRequests,
    getPendingApprovals,
} from "../controllers/connection.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.use(verifyJWT);

router.route("/create/:connectionId").post(createConnection);
router.route("/accept/:connectionId").put(acceptConnection);
router.route("/reject/:connectionId").delete(rejectConnection);
router.route("/is-connection/:connectionId").get(connectionStatus);
router.route("/").get(getConnections);
router.route("/pending-requests").get(getPendingRequests);
router.route("/pending-approvals").get(getPendingApprovals);

export default router;
