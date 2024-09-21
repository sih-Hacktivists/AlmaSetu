import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Connection } from "../models/connection.model.js";
import { User } from "../models/user.model.js";
import { Notification } from "../models/notification.model.js";

const createConnection = asyncHandler(async (req, res) => {
    const { connectionId } = req.params;
    const userId = req.user._id;

    if (connectionId == userId) {
        return res
            .status(400)
            .json({ message: "You cannot connect with yourself" });
    }

    const getConnection = await User.findById(connectionId);

    if (req.user.role === "student" && getConnection.role === "student") {
        return res
            .status(400)
            .json({ message: "You can only connect with alumni" });
    }

    const connection = await Connection.create({
        connectFrom: userId,
        connectTo: connectionId,
    });

    await Notification.create({
        user: connectionId,
        message: `${req.user.name} sent you a connection request`,
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { connection, message: "Sent" },
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

    await Notification.create({
        user: isConnection.connectFrom,
        message: `${req.user.name} accepted your connection request`,
    });

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

    await Notification.create({
        user: isConnection.connectFrom,
        message: `${req.user.name} rejected your connection request`,
    });

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Connection request rejected successfully")
        );
});

const connectionStatus = asyncHandler(async (req, res) => {
    const { connectionId } = req.params;
    const userId = req.user._id;

    const connection = await Connection.findOne({
        $or: [
            { connectFrom: connectionId, connectTo: userId },
            { connectFrom: userId, connectTo: connectionId },
        ],
    });

    if (!connection) {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { connection, message: "Not Sent" },
                    "Not Sent"
                )
            );
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { connection, message: "Sent" }, "Sent"));
});

const getConnections = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const connections = await Connection.find({
        isAccepted: true,
        $or: [{ connectFrom: userId }, { connectTo: userId }],
    }).populate("connectFrom connectTo", "name email role profilePic");

    const userConnections = connections.map((connection) => {
        if (connection.connectFrom._id.equals(userId)) {
            return {
                connectionId: connection._id,
                user: connection.connectTo,
            };
        } else {
            return {
                connectionId: connection._id,
                user: connection.connectFrom,
            };
        }
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                userConnections,
                "Connections fetched successfully"
            )
        );
});

const getPendingRequests = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const connections = await Connection.find({
        isAccepted: false,
        connectFrom: userId,
    }).populate("connectTo", "name email role profilePic");

    const userPendingRequests = connections.map((connection) => {
        return {
            connectionId: connection._id,
            user: connection.connectTo,
        };
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                userPendingRequests,
                "Pending Requests connections fetched successfully"
            )
        );
});

const getPendingApprovals = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const connections = await Connection.find({
        isAccepted: false,
        connectTo: userId,
    }).populate("connectFrom", "name email role profilePic");

    const userPendingApprovals = connections.map((connection) => {
        return {
            connectionId: connection._id,
            user: connection.connectFrom,
        };
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                userPendingApprovals,
                "Pending Approvals connections fetched successfully"
            )
        );
});

export {
    createConnection,
    acceptConnection,
    rejectConnection,
    connectionStatus,
    getConnections,
    getPendingRequests,
    getPendingApprovals,
};
