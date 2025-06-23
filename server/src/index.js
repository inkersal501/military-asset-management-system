import express from "express";
import cors from "cors";
import config from "./config/config.js";
import route from "./routes/index.js";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";

const app = express();
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again after 5 minutes',
});

app.use(limiter);
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Military Asset Management System");
});

app.use(route);
 
mongoose.connect(config.DB_URI)
.then(() => {
    console.log("MongoDB Connected");
    app.listen(config.PORT, () => {
        console.log(`Server running on port ${config.PORT}`);
    });
})
.catch(err => console.error("DB Connection Error:", err));