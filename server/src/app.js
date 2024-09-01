import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

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

// Routes declaration
app.use("/api/v1/users/", userRouter);
app.use("/api/v1/topics/", topicRouter);
app.use("/api/v1/communities/", communityRouter);
app.use("/api/v1/events/", eventRouter);

export { app };
