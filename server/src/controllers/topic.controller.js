import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Topic } from "../models/topic.model.js";

// for alumni
const createTopic = asyncHandler(async (req, res) => {
    if (req.user.role !== "alumni") {
        return res
            .status(403)
            .json({ message: "You are not authorized to create a topic" });
    }

    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    const topic = await Topic.create({ name });

    return res
        .status(201)
        .json(new ApiResponse(201, topic, "Topic created successfully"));
});

const getTopics = asyncHandler(async (req, res) => {
    if (req.user.role !== "alumni") {
        return res
            .status(403)
            .json({ message: "You are not authorized to get all topics" });
    }

    const topics = await Topic.find();

    return res.status(200).json(new ApiResponse(200, topics, "Topics fetched"));
});

export { createTopic, getTopics };
