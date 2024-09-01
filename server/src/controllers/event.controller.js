import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// for alumni(event owner)
const createEvent = asyncHandler(async (req, res) => {
    if (req.user.role !== "alumni") {
        throw new ApiError(403, "You are not authorized to create an event");
    }

    const { title, description, startDate, endDate, startTime } = req.body;

    if (!title || !description || startDate || endDate || startTime) {
        throw new ApiError(400, "All fields are required");
    }

    const college = req.user.college;

    let imageLocalPath;
    if (req.file) {
        imageLocalPath = req.file.path;
    }

    const image = await uploadOnCloudinary(imageLocalPath);

    if (!image) {
        throw new ApiError(500, "Image file is required");
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

const getRegisteredMembers = asyncHandler(async (req, res) => {
    if (req.user.role !== "alumni") {
        throw new ApiError(
            403,
            "You are not authorized to perform this action"
        );
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

const removeMember = asyncHandler(async (req, res) => {
    if (req.user.role !== "alumni") {
        throw new ApiError(403, "You are not authorized to remove a member");
    }

    const { eventId, memberId } = req.params;

    const event = await Event.findById(eventId);

    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    if (event.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to remove a member");
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
    // ask deep if alumni can join event
    if (req.user.role !== "student") {
        throw new ApiError(403, "You are not authorized to join an event");
    }

    const { eventId } = req.params;

    const event = await Event.findById(eventId);

    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    if (event.isCompleted) {
        throw new ApiError(400, "Event is already completed");
    }

    if (event.college !== req.user.college) {
        throw new ApiError(400, "You are not allowed to join this event");
    }

    if (event.registeredMembers.includes(req.user._id)) {
        throw new ApiError(400, "You are already registered for this event");
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

const getEvent = asyncHandler(async (req, res) => {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);

    return res
        .status(200)
        .json(new ApiResponse(200, event, "Event details fetched"));
});

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
