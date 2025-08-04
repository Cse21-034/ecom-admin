# EcomAdmin Backend

This is the backend API server for the EcomAdmin application, designed to be deployed on Render.

## Features

- Express.js REST API
- PostgreSQL database with Drizzle ORM
- Authentication with Passport.js
- Session management
- CORS support for frontend communication

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp env.example .env
```

3. Update the `.env` file with your configuration:
- `DATABASE_URL`: Your PostgreSQL connection string
- `FRONTEND_URL`: Your frontend URL (for CORS)
- `SESSION_SECRET`: A secure random string for session encryption

4. Run database migrations:
```bash
npm run db:push
```

5. Start development server:
```bash
npm run dev
```

## Deployment on Render

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Use the following settings:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment Variables: Set all required variables from `.env`

## API Endpoints

- `GET /health` - Health check
- `GET /api/*` - All API routes

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `FRONTEND_URL` - Frontend URL for CORS
- `SESSION_SECRET` - Session encryption secret
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production) 