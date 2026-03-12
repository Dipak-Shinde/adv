import dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRoutes from "./src/routes/userRoutes.js";
import profileRoutes from "./src/routes/profileRoutes.js";
import sidemenuRoutes from "./src/routes/sidemenuRoutes.js";
import clientRoutes from './src/routes/clientRoutes.js';
import { errorHandler } from './src/middlewares/errorHandler.js';
import caseRoutes from "./src/routes/caseRoutes.js";
import caseNoteRoutes from "./src/routes/caseNoteRoutes.js";
import hearingRoutes from "./src/routes/hearingRoutes.js";
import appointmentRoutes from "./src/routes/appointmentRoutes.js";
import calenderRoutes from "./src/routes/calenderRoutes.js";

import path from "path";
import cors from "cors";


const app = express();



/* ================= CORS ================= */
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5174",
        "http://localhost:5173",
        "http://localhost:5000",
        "http://192.168.1.54:5173",
        process.env.CLIENT_URL,
      ].filter(Boolean);

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked: ${origin}`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ================= MIDDLEWARE ================= */
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

/* ================= ROUTES ================= */
app.use("/api/users", userRoutes);

// Profile routes
app.use("/api/profile", profileRoutes);


app.use("/uploads", express.static(path.resolve("uploads")));

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Backend" });
});


/* All ROUTES */


app.use("/api/sidemenu", sidemenuRoutes);

app.use('/api/clients', clientRoutes);

app.use("/api/cases", caseRoutes);

app.use("/api/case-notes", caseNoteRoutes);

app.use("/api/hearings", hearingRoutes);

app.use("/api/appointments", appointmentRoutes);


app.use("/api/calender", calenderRoutes);

// Error handler middleware
app.use(errorHandler);

/* ================= HEALTH CHECK ================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Auth backend is running 🚀"
  });
});
console.log("JWT_SECRET loaded:", !!process.env.JWT_SECRET);


/* ================= SERVER START ================= */
const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
});