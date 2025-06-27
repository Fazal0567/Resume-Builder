require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/conn');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/errorMiddleware');
const userRouter = require('./routes/userRoutes');
const resumeRouter = require('./routes/resumeRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Connect to DB
connectDB();

// Parse allowed origins from .env
const allowedOrigins = process.env.ORIGIN
  ? process.env.ORIGIN.split(',').map(origin => origin.trim())
  : [];

console.log("✅ Allowed Origins:", allowedOrigins);

// CORS middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`❌ CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Middleware stack
app.use(express.json());
app.use(cookieParser());

// Health check
app.get("/", (req, res) => {
  res.json({ message: "API working ✅" });
});

// Routes
app.use('/api/user', userRouter);
app.use('/api/resumes', resumeRouter);

// Error handler
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
