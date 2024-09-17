import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Connection } from "../models/connection.model.js";
import { User } from "../models/user.model.js";

const createConnection = asyncHandler(async (req, res) => {
    const { connectionId } = req.params;
    const userId = req.user._id;

    if (connectionId == userId) {
        return res
            .status(400)
            .json({ message: "You cannot connect with yourself" });
    }

    const getConnection = await User.findById(connectionId);

    if (getConnection.role !== "alumni") {
        return res
            .status(400)
            .json({ message: "You can only connect with alumni" });
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

    const isConnection = await Connection.findById(connectionId);

    if (!isConnection) {
        return res
            .status(404)
            .json({ message: "Connection request not found" });
    }

    if (!isConnection.connectTo.equals(req.user._id)) {
        return res.status(403).json({
            message: "You are not authorized to accept this connection",
        });
    }

    const connection = await Connection.findByIdAndUpdate(
        connectionId,
        {
            isAccepted: true,
        },
        { new: true }
    );

    if (!connection) {
        return res
            .status(404)
            .json({ message: "Connection request not found" });
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

    const isConnection = await Connection.findById(connectionId);

    if (!isConnection) {
        return res
            .status(404)
            .json({ message: "Connection request not found" });
    }

    if (!isConnection.connectTo.equals(req.user._id)) {
        return res.status(403).json({
            message: "You are not authorized to reject this connection",
        });
    }

    const connection = await Connection.findByIdAndDelete(connectionId);

    if (!connection) {
        return res
            .status(404)
            .json({ message: "Connection request not found" });
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Connection request rejected successfully")
        );
});

const getConnections = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const connections = await Connection.find({
        isAccepted: true,
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

const getPendingRequests = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const connections = await Connection.find({
        isAccepted: false,
        connectFrom: userId,
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                connections,
                "Pending Requests connections fetched successfully"
            )
        );
});

const getPendingApprovals = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const connections = await Connection.find({
        isAccepted: false,
        connectTo: userId,
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                connections,
                "Pending Approvals connections fetched successfully"
            )
        );
});

export {
    createConnection,
    acceptConnection,
    rejectConnection,
    getConnections,
    getPendingRequests,
    getPendingApprovals,
};
