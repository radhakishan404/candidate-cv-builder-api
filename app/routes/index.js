import express from "express";

const app = express();

import userRoutes from "../features/user/user.route.js";

app.use("/", userRoutes);

export default app;