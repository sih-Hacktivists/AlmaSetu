import {
    createEvent,
    getRegisteredMembers,
    removeMember,
    joinEvent,
    getEvent,
    getRegisteredEvents,
    getUnregisteredEvents,
} from "../controllers/event.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router();

router.use(verifyJWT);

router.post("/create", createEvent);
router.get("/:eventId/registered-members", getRegisteredMembers);
router.delete("/:eventId/remove-member/:memberId", removeMember);
router.post("/:eventId/join", joinEvent);
router.get("/:eventId", getEvent);
router.get("/registered-events", getRegisteredEvents);
router.get("/unregistered-events", getUnregisteredEvents);

export default router;
