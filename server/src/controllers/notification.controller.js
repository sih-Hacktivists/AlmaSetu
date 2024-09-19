import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Notification } from "../models/notification.model.js";

const getNotifications = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const notifications = await Notification.find({ user: userId }).sort({
        createdAt: -1,
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                notifications,
                "Notifications fetched successfully"
            )
        );
});

const readNotification = asyncHandler(async (req, res) => {
    const { notificationId } = req.params;

    const notification = await Notification.findById(notificationId);

    if (!notification) {
        return res.status(400).json({ message: "Notification not found" });
    }

    notification.read = true;

    await notification.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(
            new ApiResponse(200, notification, "Notification read successfully")
        );
});

const deleteNotifiaction = asyncHandler(async (req, res) => {
    const { notificationId } = req.params;

    const notification = await Notification.findById(notificationId);

    if (!notification) {
        return res.status(400).json({ message: "Notification not found" });
    }

    await Notification.findByIdAndDelete(notificationId);

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Notification deleted successfully"));
});

export { getNotifications, readNotification, deleteNotifiaction };
