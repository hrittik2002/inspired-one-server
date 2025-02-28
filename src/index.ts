import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/connectToDB';
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

dotenv.config();

// Debug log to verify env variables
console.log('Environment variables loaded:', {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV
});

const app = express();
app.use(express.json());

// Configure CORS
app.use(cors({
  origin: ['http://localhost:8084', 'http://localhost:8080', 'http://192.168.0.204:8080'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  exposedHeaders: ['Content-Length', 'Content-Type']
}));

// connect to the database
connectDB()
  
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT)
  .on('error', (e: any) => {
    if (e.code === 'EADDRINUSE') {
      console.log(`Port ${PORT} is busy, trying ${PORT}...`);
      server.close();
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } else {
      console.error('Server error:', e);
    }
  })
  .on('listening', () => {
    console.log(`Server running on port ${PORT}`);
  });

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

export default app;