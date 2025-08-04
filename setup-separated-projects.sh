#!/bin/bash

echo "🚀 Setting up EcomAdmin separated projects..."

# Check if we're in the right directory
if [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    echo "❌ Error: frontend and backend directories not found!"
    echo "Please run this script from the root of the EcomAdmin project."
    exit 1
fi

echo "📦 Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

cd ..

echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo ""
echo "1. Backend setup:"
echo "   cd backend"
echo "   cp env.example .env"
echo "   # Edit .env with your database URL and other settings"
echo "   npm run dev"
echo ""
echo "2. Frontend setup:"
echo "   cd frontend"
echo "   cp env.example .env"
echo "   # Edit .env with your backend API URL"
echo "   npm run dev"
echo ""
echo "3. For deployment, see DEPLOYMENT.md"
echo ""
echo "🌐 Development URLs:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:5000"
echo ""
echo "📚 Documentation:"
echo "   - README.md - General project information"
echo "   - DEPLOYMENT.md - Deployment guide"
echo "   - frontend/README.md - Frontend specific guide"
echo "   - backend/README.md - Backend specific guide" 