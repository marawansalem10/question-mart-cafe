
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import categoryRoutes from './routes/categoryRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import reservationRoutes from './routes/reservationRoutes';
import reviewRoutes from './routes/reviewRoutes';
import loyaltyRoutes from './routes/loyaltyRoutes';
import rewardRoutes from './routes/rewardRoutes';
import branchRoutes from './routes/branchRoutes';
import { errorHandler, notFound } from './middleware/errorHandler';
import { rateLimiter, authRateLimiter } from './middleware/rateLimiter';
import config from './config/env';

const app = express();

// Railway (and other reverse proxies) set X-Forwarded-For.
// Without this, req.ip is the proxy address and rate limits collapse all clients into one bucket.
if (config.nodeEnv === 'production') {
  app.set('trust proxy', 1);
}

// Security middleware
app.use(helmet({
  contentSecurityPolicy: config.nodeEnv === 'production' ? undefined : false,
}));

// CORS configuration
app.use(cors({
  origin: config.nodeEnv === 'production' ? config.frontendOrigins : '*',
  credentials: true,
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
app.use(rateLimiter());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Question Mart & Cafe API is running!' });
});

// API routes
app.use('/api/auth', authRateLimiter, authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/loyalty', loyaltyRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/branches', branchRoutes);

// 404 handler
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

export default app;
