# EcomAdmin Frontend

This is the frontend React application for the EcomAdmin system, designed to be deployed on Vercel.

## Features

- React 18 with TypeScript
- Vite build tool
- Tailwind CSS for styling
- Radix UI components
- React Query for data fetching
- Wouter for routing

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
- `VITE_API_URL`: Your backend API URL

4. Start development server:
```bash
npm run dev
```

## Development

The development server will run on `http://localhost:5173` and proxy API requests to your backend server.

## Deployment on Vercel

1. Connect your GitHub repository to Vercel
2. Import the project
3. Configure environment variables:
   - `VITE_API_URL`: Your backend API URL (e.g., `https://your-backend.onrender.com`)

## Build

```bash
npm run build
```

This will create a production build in the `dist` directory.

## Environment Variables

- `VITE_API_URL` - Backend API URL (required for production)

## Project Structure

- `src/components/` - Reusable UI components
- `src/pages/` - Page components
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utility functions and configurations 