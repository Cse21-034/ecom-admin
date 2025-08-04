# Deployment Guide

This guide will help you deploy the EcomAdmin application to Vercel (frontend) and Render (backend).

## Prerequisites

1. GitHub repository with your code
2. Vercel account
3. Render account
4. PostgreSQL database (you can use Neon, Supabase, or any PostgreSQL provider)

## Step 1: Deploy Backend to Render

### 1.1 Prepare Your Database

1. Create a PostgreSQL database (recommended: Neon or Supabase)
2. Get your database connection string
3. Note down the connection string for later use

### 1.2 Deploy to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `ecom-admin-backend`
   - **Root Directory**: `backend` (if your backend is in a subdirectory)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free (or choose paid plan)

### 1.3 Configure Environment Variables

In the Render dashboard, add these environment variables:

```
NODE_ENV=production
DATABASE_URL=your_postgresql_connection_string
FRONTEND_URL=https://your-frontend-domain.vercel.app
SESSION_SECRET=your_secure_random_string
```

### 1.4 Deploy

1. Click "Create Web Service"
2. Wait for the build to complete
3. Note your backend URL (e.g., `https://ecom-admin-backend.onrender.com`)

## Step 2: Deploy Frontend to Vercel

### 2.1 Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend` (if your frontend is in a subdirectory)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 2.2 Configure Environment Variables

In the Vercel dashboard, add this environment variable:

```
VITE_API_URL=https://your-backend-domain.onrender.com
```

### 2.3 Deploy

1. Click "Deploy"
2. Wait for the build to complete
3. Note your frontend URL (e.g., `https://ecom-admin-frontend.vercel.app`)

## Step 3: Update Configuration

### 3.1 Update Backend CORS

Go back to your Render dashboard and update the `FRONTEND_URL` environment variable with your actual Vercel frontend URL:

```
FRONTEND_URL=https://your-actual-frontend-domain.vercel.app
```

### 3.2 Redeploy Backend

Trigger a redeploy of your backend service in Render to apply the CORS changes.

## Step 4: Test Your Deployment

1. Visit your frontend URL
2. Test the application functionality
3. Check that API calls are working
4. Verify authentication flows

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure `FRONTEND_URL` in backend matches your actual frontend URL
2. **Database Connection**: Verify your `DATABASE_URL` is correct and accessible
3. **Build Failures**: Check the build logs in both Vercel and Render dashboards
4. **Environment Variables**: Ensure all required environment variables are set

### Debugging

1. **Backend Logs**: Check Render dashboard for backend logs
2. **Frontend Logs**: Check Vercel dashboard for frontend build logs
3. **Network Tab**: Use browser dev tools to check API requests
4. **Health Check**: Visit `https://your-backend.onrender.com/health` to test backend

## Environment Variables Reference

### Backend (Render)
- `NODE_ENV`: `production`
- `DATABASE_URL`: Your PostgreSQL connection string
- `FRONTEND_URL`: Your Vercel frontend URL
- `SESSION_SECRET`: A secure random string for session encryption

### Frontend (Vercel)
- `VITE_API_URL`: Your Render backend URL

## Custom Domains

### Backend Custom Domain
1. In Render dashboard, go to your service settings
2. Add a custom domain
3. Update your DNS records
4. Update `FRONTEND_URL` with the new domain

### Frontend Custom Domain
1. In Vercel dashboard, go to your project settings
2. Add a custom domain
3. Update your DNS records
4. Update `FRONTEND_URL` in backend with the new domain

## Monitoring

### Backend Monitoring
- Use Render's built-in monitoring
- Set up health checks
- Monitor database connections

### Frontend Monitoring
- Use Vercel Analytics
- Monitor Core Web Vitals
- Set up error tracking

## Security Considerations

1. **Environment Variables**: Never commit `.env` files to Git
2. **Database**: Use connection pooling and SSL
3. **CORS**: Only allow your frontend domain
4. **Sessions**: Use secure session configuration
5. **HTTPS**: Both Vercel and Render provide HTTPS by default 