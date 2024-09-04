import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Connection } from "../models/connection.model.js";
import { User } from "../models/user.model.js";

const createConnection = asyncHandler(async (req, res) => {
    const { connectionId } = req.body;
    const userId = req.user._id;

    if (connectionId === userId) {
        throw new ApiError(400, "You cannot connect with yourself");
    }

    const getConnection = await User.findById(connectionId);

    if (getConnection.role !== "alumni") {
        throw new ApiError(400, "You can only connect with alumni");
    }

    const connection = await Connection.create({
        connectFrom: userId,
        connectTo: connectionId,
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                connection,
                "Connection request created successfully"
            )
        );
});

const acceptConnection = asyncHandler(async (req, res) => {
    const { connectionId } = req.params;

    const connection = await Connection.findByIdAndUpdate(
        connectionId,
        {
            isAccepted: true,
        },
        { new: true }
    );

    if (!connection) {
        throw new ApiError(404, "Connection request not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                connection,
                "Connection request accepted successfully"
            )
        );
});

const rejectConnection = asyncHandler(async (req, res) => {
    const { connectionId } = req.params;

    const connection = await Connection.findByIdAndDelete(connectionId);

    if (!connection) {
        throw new ApiError(404, "Connection request not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                connection,
                "Connection request rejected successfully"
            )
        );
});

const getConnections = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const connections = await Connection.find({
        $or: [{ connectFrom: userId }, { connectTo: userId }],
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                connections,
                "Connections fetched successfully"
            )
        );
});

export { createConnection, acceptConnection, rejectConnection, getConnections };