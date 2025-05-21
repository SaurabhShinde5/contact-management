import express from "express";
import dotenv from "dotenv";
dotenv.config();

import contactRoutes from "./routes/contactRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { connectDb } from "./config/dbConnection.js";

connectDb();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/contacts", contactRoutes);
app.use(errorHandler);

app.listen(
  PORT,
  console.log(`server is running on : http://localhost:${PORT}`)
);
