import express from 'express';
import userRouter from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

export const app = express();

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
  credentials: true, 
};

// Middlewares
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/users', userRouter);
