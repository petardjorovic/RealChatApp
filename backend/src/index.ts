import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabase from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env.js";
import catchErrors from "./utils/catchErrors.js";
import { OK } from "./constants/http.js";
import authRoutes from "./routes/auth.route.js";

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

app.use("/auth", authRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server iz running on ${PORT} in ${NODE_ENV} environment`);
  await connectToDatabase();
});
