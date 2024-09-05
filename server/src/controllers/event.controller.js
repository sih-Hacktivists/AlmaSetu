import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// for alumni(event owner)
const createEvent = asyncHandler(async (req, res) => {
    if (req.user.role !== "alumni") {
        return res
            .status(403)
            .json({ message: "You are not authorized to create an event" });
    }

    const { title, description, startDate, endDate, startTime } = req.body;

    if (!title || !description || startDate || endDate || startTime) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const college = req.user.college;

    let imageLocalPath;
    if (req.file) {
        imageLocalPath = req.file.path;
    }

    const image = await uploadOnCloudinary(imageLocalPath);

    if (!image) {
        return res.status(500).json({ message: "Image is required" });
    }

    const event = await Event.create({
        owner: req.user._id,
        title,
        description,
        startDate,
        endDate,
        startTime,
        college,
        image: image.url,
    });

    await User.findByIdAndUpdate(req.user._id, {
        $push: { events: event._id },
    });

    return res
        .status(201)
        .json(new ApiResponse(201, "Event created successfully", event));
});

// get the registered members of an event
const getRegisteredMembers = asyncHandler(async (req, res) => {
    if (req.user.role !== "alumni") {
        return res
            .status(403)
            .json({ message: "You are not authorized to perform this action" });
    }

    const { eventId } = req.params;

    const event = await Event.findById(eventId).populate("registeredMembers");

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                event.registeredMembers,
                "Registered members fetched"
            )
        );
});

// remove a member from an event
const removeMember = asyncHandler(async (req, res) => {
    if (req.user.role !== "alumni") {
        return res
            .status(403)
            .json({ message: "You are not authorized to remove a member" });
    }

    const { eventId, memberId } = req.params;

    const event = await Event.findById(eventId);

    if (!event) {
        return res.status(404).json({ message: "Event not found" });
    }

    if (event.owner.toString() !== req.user._id.toString()) {
        return res
            .status(403)
            .json({ message: "You are not authorized to remove a member" });
    }

    await Event.findByIdAndUpdate(eventId, {
        $pull: { registeredMembers: memberId },
    });

    await User.findByIdAndUpdate(memberId, {
        $pull: { registeredEvents: eventId },
    });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Member removed successfully"));
});

// for all
const joinEvent = asyncHandler(async (req, res) => {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);

    if (!event) {
        return res.status(404).json({ message: "Event not found" });
    }

    if (req.user.role === "alumni") {
        if (event.owner.toString() === req.user._id.toString()) {
            return res
                .status(400)
                .json({ message: "You are the owner of this event" });
        }
    }

    if (event.isCompleted) {
        return res.status(400).json({ message: "Event is already completed" });
    }

    if (event.college !== req.user.college) {
        return res
            .status(400)
            .json({ message: "You are not allowed to join this event" });
    }

    if (event.registeredMembers.includes(req.user._id)) {
        return res
            .status(400)
            .json({ message: "You are already registered for this event" });
    }

    await Event.findByIdAndUpdate(eventId, {
        $push: { registeredMembers: req.user._id },
    });

    await User.findByIdAndUpdate(req.user._id, {
        $push: { events: eventId },
    });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "You have registered successfully"));
});

// get the details of an event
const getEvent = asyncHandler(async (req, res) => {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);

    return res
        .status(200)
        .json(new ApiResponse(200, event, "Event details fetched"));
});

// get the registered events of a user
const getRegisteredEvents = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate("events");

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user.registeredEvents,
                "Registered events fetched"
            )
        );
});

// get the unregistered events of a user
const getUnregisteredEvents = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate("events");

    const events = await Event.find({ college: req.user.college });

    const unregisteredEvents = events.filter(
        (event) => !user.registeredEvents.includes(event._id)
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                unregisteredEvents,
                "Unregistered events fetched"
            )
        );
});

export {
    createEvent,
    getRegisteredMembers,
    removeMember,
    joinEvent,
    getEvent,
    getRegisteredEvents,
    getUnregisteredEvents,
};
