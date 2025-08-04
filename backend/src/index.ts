import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabase from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env.js";
import { OK } from "./constants/http.js";
import authRoutes from "./routes/auth.route.js";
import authenticate from "./middleware/authenticate.js";
import userRoutes from "./routes/user.route.js";
import sessionRoutes from "./routes/session.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", async (req, res) => {
  res.status(OK).json({
    status: "success",
  });
});

// auth routes
app.use("/auth", authRoutes);

// protected routes
app.use("/user", authenticate, userRoutes);
app.use("/sessions", authenticate, sessionRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server iz running on ${PORT} in ${NODE_ENV} environment`);
  await connectToDatabase();
});
