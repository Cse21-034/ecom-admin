# EcomAdmin - Separated Frontend & Backend

This project has been separated into two independent applications:

- **Frontend**: React application deployed on Vercel
- **Backend**: Express.js API server deployed on Render

## Project Structure

```
EcomAdmin/
├── frontend/          # React application (Vercel deployment)
│   ├── src/          # React source code
│   ├── package.json  # Frontend dependencies
│   └── vercel.json   # Vercel configuration
├── backend/          # Express.js API server (Render deployment)
│   ├── src/          # Backend source code
│   ├── package.json  # Backend dependencies
│   └── render.yaml   # Render configuration
└── shared/           # Shared TypeScript types and schemas
```

## Quick Start

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env
# Edit .env with your configuration
```

4. Start development server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env
# Edit .env with your backend API URL
```

4. Start development server:
```bash
npm run dev
```

## Deployment

### Backend (Render)

1. Push your code to GitHub
2. Connect your repository to Render
3. Create a new Web Service
4. Configure environment variables in Render dashboard
5. Deploy

### Frontend (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

## Environment Variables

### Backend (.env)
- `DATABASE_URL` - PostgreSQL connection string
- `FRONTEND_URL` - Frontend URL for CORS
- `SESSION_SECRET` - Session encryption secret
- `PORT` - Server port (default: 5000)

### Frontend (.env)
- `VITE_API_URL` - Backend API URL

## Development Workflow

1. Start the backend server first
2. Start the frontend development server
3. Frontend will proxy API requests to backend during development
4. For production, update `VITE_API_URL` to point to your deployed backend

## Shared Code

The `shared/` directory contains TypeScript types and database schemas that are used by both frontend and backend. This ensures type safety across the full stack.

## API Communication

- Development: Frontend proxies `/api/*` requests to `http://localhost:5000`
- Production: Frontend makes direct requests to your deployed backend URL

## Database

The backend uses Drizzle ORM with PostgreSQL. Run migrations with:
```bash
cd backend
npm run db:push
``` 