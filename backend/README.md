# Question Mart & Cafe Backend API

A comprehensive backend API for Question Mart & Cafe - a cafe management system with ordering, reservations, reviews, loyalty program, and reward redemption features.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control (customer, staff, admin, super_admin)
- **Product Management**: Full CRUD operations for products with multi-language support (English/Arabic)
- **Category Management**: Organize products by categories (drinks, bakery, food)
- **Order Management**: Create and manage orders with multiple payment methods and order types
- **Reservation System**: Table reservations with seating preferences
- **Review System**: Customer reviews with admin approval workflow
- **Loyalty Program**: Points-based loyalty system with membership tiers (bronze, silver, gold, platinum)
- **Reward Redemption**: Redeem loyalty points for rewards
- **Branch Management**: Multiple branch locations with geolocation support
- **Security**: Rate limiting, helmet security headers, CORS configuration, input validation
- **Performance**: MongoDB indexes for optimized queries

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Security**: Helmet, CORS, bcryptjs
- **Validation**: Custom validators with express-validator
- **Logging**: Morgan (development mode)
- **Rate Limiting**: Custom in-memory rate limiter

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd questionmartcafe_v1/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Configure environment variables (see Environment Variables section below)

5. Start the development server:
```bash
npm run dev
```

6. For production build:
```bash
npm run build
npm start
```

## Environment Variables

Copy `.env.example` to `.env` and fill in local values. Never commit `.env` or real credentials.

Required:

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `JWT_EXPIRE` - JWT expiration time (format: `30d`, `1h`, `30m`)

Always used:

- `PORT` - Listen port (optional locally, default: `5000`). Production hosts such as Railway inject this.
- `NODE_ENV` - Environment mode (optional, default: `development`). Use `production` on Railway.
- `FRONTEND_URL` - Comma-separated frontend origins for CORS. **Required when `NODE_ENV=production`.** Include both the customer and admin origins, for example `http://localhost:3000,http://localhost:3001` in local files. Set deployed origins in the host environment; do not commit production URLs as secrets.

**Security notes**:
- In production, the application will fail to start if `JWT_SECRET` is still a documented placeholder value.
- In production, the application will fail to start if `FRONTEND_URL` is missing or empty (CORS is not left open).

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript (`dist/server.js`)
- `npm start` - Start production server (`node dist/server.js`)
- `npm run seed` - Seed database with sample categories and products (local/dev only; not used by Railway start)

## Railway (backend service)

This repository is not an npm-workspaces monorepo. Configure the Railway **backend** service with:

- **Root / service directory:** `backend/`
- **Build command:** `npm run build` (Nixpacks runs the `build` script from `backend/package.json`)
- **Start command:** `npm start` (`node dist/server.js`)
- **Node:** `>=18` (`engines` in `backend/package.json`)

Set `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRE`, `NODE_ENV=production`, and `FRONTEND_URL` in the Railway service variables. Railway provides `PORT`. Do not add a Dockerfile unless a later phase requires it.

## API Overview

### Base URL

- Development: `http://localhost:5000`
- Production: the public URL assigned by the hosting platform (for example Railway)

### Authentication

Most endpoints require authentication via JWT token in the `Authorization` header:

```
Authorization: Bearer <your-jwt-token>
```

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

#### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

#### Products
- `GET /api/products` - Get all available products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Deactivate product (Admin)

#### Categories
- `GET /api/categories` - Get all active categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create new category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Deactivate category (Admin)

#### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/my-orders` - Get current user's orders
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders` - Get all orders (Admin)
- `PATCH /api/orders/:id/status` - Update order status (Admin)

#### Reservations
- `POST /api/reservations` - Create new reservation
- `GET /api/reservations/my-reservations` - Get current user's reservations
- `GET /api/reservations` - Get all reservations (Admin)
- `GET /api/reservations/:id` - Get reservation by ID
- `PATCH /api/reservations/:id/status` - Update reservation status (Admin)
- `DELETE /api/reservations/:id` - Cancel reservation

#### Reviews
- `POST /api/reviews` - Create new review
- `GET /api/reviews` - Get all reviews (Admin)
- `GET /api/reviews/product/:productId` - Get approved reviews for a product
- `PUT /api/reviews/:id` - Update review
- `PATCH /api/reviews/:id/approve` - Approve/reject review (Admin)
- `DELETE /api/reviews/:id` - Delete review

#### Loyalty
- `GET /api/loyalty/me` - Get current user's loyalty account
- `GET /api/loyalty/:userId` - Get user's loyalty account (Admin)
- `PATCH /api/loyalty/:userId/add-points` - Add points (Admin)
- `PATCH /api/loyalty/:userId/remove-points` - Remove points (Admin)
- `PATCH /api/loyalty/:userId/membership` - Update membership level (Admin)
- `PATCH /api/loyalty/:userId/regenerate-qr` - Regenerate QR code (Admin)

#### Rewards
- `GET /api/rewards` - Get all active rewards
- `POST /api/rewards` - Create new reward (Admin)
- `PUT /api/rewards/:id` - Update reward (Admin)
- `DELETE /api/rewards/:id` - Delete reward (Admin)
- `POST /api/rewards/:id/redeem` - Redeem reward
- `GET /api/rewards/history/me` - Get redemption history

#### Branches
- `GET /api/branches` - Get all active branches
- `GET /api/branches/:id` - Get branch by ID
- `POST /api/branches` - Create new branch (Admin)
- `PUT /api/branches/:id` - Update branch (Admin)
- `DELETE /api/branches/:id` - Delete branch (Admin)
- `PATCH /api/branches/:id/status` - Update branch status (Admin)

#### Health
- `GET /health` - Health check endpoint

## Folder Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts       # MongoDB connection configuration
│   │   └── env.ts            # Environment variable validation
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── userController.ts
│   │   ├── productController.ts
│   │   ├── categoryController.ts
│   │   ├── orderController.ts
│   │   ├── reservationController.ts
│   │   ├── reviewController.ts
│   │   ├── loyaltyController.ts
│   │   ├── rewardController.ts
│   │   └── branchController.ts
│   ├── middleware/
│   │   ├── auth.ts           # JWT authentication middleware
│   │   ├── authorize.ts      # Role-based authorization middleware
│   │   ├── errorHandler.ts   # Centralized error handling
│   │   └── rateLimiter.ts    # Rate limiting middleware
│   ├── models/
│   │   ├── User.ts
│   │   ├── Product.ts
│   │   ├── Category.ts
│   │   ├── Order.ts
│   │   ├── Reservation.ts
│   │   ├── Review.ts
│   │   ├── Loyalty.ts
│   │   ├── Reward.ts
│   │   ├── PointsTransaction.ts
│   │   └── Branch.ts
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── userRoutes.ts
│   │   ├── productRoutes.ts
│   │   ├── categoryRoutes.ts
│   │   ├── orderRoutes.ts
│   │   ├── reservationRoutes.ts
│   │   ├── reviewRoutes.ts
│   │   ├── loyaltyRoutes.ts
│   │   ├── rewardRoutes.ts
│   │   └── branchRoutes.ts
│   ├── scripts/
│   │   └── seed.ts            # Database seeding script
│   ├── types/
│   │   ├── index.ts          # TypeScript type definitions
│   │   └── express.d.ts      # Express Request augmentation
│   ├── utils/
│   │   ├── helpers.ts        # Utility functions
│   │   └── jwt.ts            # JWT token generation/verification
│   ├── app.ts                # Express app configuration
│   └── server.ts             # Server entry point
├── .env.example              # Example environment variables
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── swagger.json              # OpenAPI/Swagger documentation
└── README.md                 # This file
```

## User Roles

- **customer**: Regular customer with access to ordering, reservations, reviews, and loyalty features
- **staff**: Staff member with elevated permissions (future use)
- **admin**: Administrator with full access to all management features
- **super_admin**: Super administrator with all permissions including user management

## Loyalty Program

The loyalty program uses a points-based system with four membership tiers:

- **Bronze**: 0-999 points
- **Silver**: 1,000-2,499 points
- **Gold**: 2,500-4,999 points
- **Platinum**: 5,000+ points

Points can be earned through purchases and redeemed for rewards.

## Security Features

- **Password Hashing**: All passwords are hashed using bcrypt with salt rounds of 10
- **JWT Authentication**: Secure token-based authentication with configurable expiration
- **Rate Limiting**: 
  - General endpoints: 100 requests per 15 minutes per IP
  - Authentication endpoints: 5 requests per 15 minutes per IP
- **Security Headers**: Helmet middleware for HTTP security headers
- **CORS**: Configurable CORS for cross-origin requests
- **Input Validation**: Comprehensive validation on all endpoints
- **SQL Injection Prevention**: No raw SQL queries; Mongoose ODM used
- **XSS Prevention**: Input sanitization helpers available
- **Password Security**: Minimum 8 characters required; passwords excluded from API responses

## Error Handling

The API uses a centralized error handling middleware that returns consistent error responses:

```json
{
  "message": "Error description"
}
```

In development mode, the response also includes the stack trace for debugging.

## Database Seeding

To seed the database with sample categories and products:

```bash
npm run seed
```

This will create sample categories (drinks, bakery, food and their subcategories) and products for testing.

## API Documentation

Complete API documentation is available in OpenAPI/Swagger format:

- **File**: `swagger.json`
- **Import**: Import the `swagger.json` file into Swagger UI or Postman for interactive documentation

## Postman Collection

A Postman collection is available at `postman-collection.json` for easy API testing.

## Development

### Running in Development Mode

```bash
npm run dev
```

The server will automatically restart on file changes using ts-node-dev.

### Building for Production

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` directory.

### Starting Production Server

```bash
npm start
```

## Performance Optimizations

- **MongoDB Indexes**: All models have optimized indexes for common query patterns
- **Query Optimization**: Efficient Mongoose queries with proper field selection
- **Connection Pooling**: MongoDB connection pooling configured
- **Rate Limiting**: Prevents abuse and ensures fair resource usage
- **Graceful Shutdown**: Proper cleanup of resources on server termination

## Monitoring

### Health Check

The `/health` endpoint provides a simple health check:

```bash
curl http://localhost:5000/health
```

Response:
```json
{
  "status": "OK",
  "message": "Question Mart & Cafe API is running!"
}
```

## Troubleshooting

### MongoDB Connection Issues

If you encounter MongoDB connection errors:
1. Verify your `MONGODB_URI` in `.env` is correct
2. Ensure your IP is whitelisted in MongoDB Atlas (if using Atlas)
3. Check network connectivity

### JWT Token Issues

If authentication fails:
1. Verify `JWT_SECRET` is set correctly in `.env`
2. Ensure the token hasn't expired (default: 30 days)
3. Check the token format: `Bearer <token>`

### Port Already in Use

If port 5000 is already in use:
1. Change the `PORT` in `.env`
2. Or stop the process using port 5000

## License

ISC

## Support

For support, contact: support@questionmartcafe.com
