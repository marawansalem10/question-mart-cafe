
# Question Mart &amp; Cafe

A modern luxury coffee shop platform with customer website, admin dashboard, and desktop management application.

## Architecture Overview

### Why This Architecture?
- **Monorepo structure** for shared dependencies and easier development
- **Separation of concerns** between frontend, backend, and desktop app
- **TypeScript** for type safety and better developer experience
- **REST API** for easy integration between all clients
- **Scalable folder structure** that can grow as the project expands

### How Components Communicate
- **Frontend (Customer &amp; Admin)**: Communicate with backend via REST API using Axios
- **Desktop App (Electron)**: Embeds the admin dashboard and communicates with backend via same REST API
- **Backend**: Uses Express.js to handle API requests, Mongoose for MongoDB interactions
- **Database**: MongoDB for storing all application data

### Scalability
- **Modular structure**: Each feature (auth, products, reservations) can be developed independently
- **API versioning ready**: Easy to add `/api/v2` routes in the future
- **Branch support**: Database models already include branch support for future expansion
- **Microservices ready**: Backend can be split into microservices if needed

### Recommendations
- Add **Redis** for caching frequently accessed data (menu, products)
- Implement **WebSocket** for real-time reservation updates
- Add **AWS S3** or similar for image storage
- Implement **CI/CD** pipelines for automated testing and deployment
- Add **Docker** for containerization

## Project Structure

```
questionmartcafe_v1/
├── backend/          # Node.js + Express + TypeScript backend
├── frontend-customer/# React + TypeScript customer website
├── frontend-admin/   # React + TypeScript admin dashboard
├── desktop/          # Electron desktop app (embeds admin dashboard)
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running locally or MongoDB Atlas account
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your MongoDB URI and JWT secret
npm run dev
```
Backend runs on http://localhost:5000

### Customer Frontend Setup
```bash
cd frontend-customer
npm install
cp .env.example .env
npm run dev
```
Customer website runs on http://localhost:3000

### Admin Dashboard Setup
```bash
cd frontend-admin
npm install
cp .env.example .env
npm run dev
```
Admin dashboard runs on http://localhost:3001

### Desktop App Setup
```bash
cd desktop
npm install
cp .env.example .env
# Make sure admin dashboard is running on http://localhost:3001
npm run dev
```

## Environment Variables

See `.env.example` files in each directory for required environment variables.

## Technology Stack

- **Frontend**: React, TypeScript, Vite, React Router, Axios, React Query
- **Backend**: Node.js, Express, TypeScript, Mongoose, MongoDB, JWT
- **Desktop**: Electron, TypeScript
- **Database**: MongoDB
