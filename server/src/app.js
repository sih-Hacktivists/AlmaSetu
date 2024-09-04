import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

const app = express();
const server = http.createServer(app);

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes import
import userRouter from "./routes/user.routes.js";
import topicRouter from "./routes/topic.routes.js";
import communityRouter from "./routes/community.routes.js";
import eventRouter from "./routes/event.routes.js";
import chatRouter from "./routes/chat.routes.js";
import messageRouter from "./routes/messages.routes.js";
import postRouter from "./routes/post.routes.js";
import commentRouter from "./routes/comment.routes.js";
import connectionRouter from "./routes/connection.routes.js";

// Routes declaration
app.use("/api/v1/users/", userRouter);
app.use("/api/v1/topics/", topicRouter);
app.use("/api/v1/communities/", communityRouter);
app.use("/api/v1/events/", eventRouter);
app.use("/api/v1/chats/", chatRouter);
app.use("/api/v1/messages/", messageRouter);
app.use("/api/v1/posts/", postRouter);
app.use("/api/v1/comments/", commentRouter);
app.use("/api/v1/connections/", connectionRouter);

// Initialize Socket.IO with the HTTP server
const io = new SocketIOServer(server, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    },
});

// Socket.IO event handling
io.on("connection", (socket) => {
    console.log("Connected to socket.io");

    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageReceived) => {
        const chat = newMessageReceived.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageReceived.sender._id) return;

            socket.in(user._id).emit("message received", newMessageReceived);
        });
    });

    socket.on("disconnect", () => {
        console.log("USER DISCONNECTED");
        // Handle disconnection logic here if needed
    });
});

export { app, server };
