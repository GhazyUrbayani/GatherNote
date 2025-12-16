#!/bin/bash
# GatherNote - Quick Setup Script
# Usage: ./quick-setup.sh

echo "=========================================="
echo "  GatherNote - Quick Setup & Run"
echo "=========================================="
echo ""

# Check if MySQL is running
echo "🔍 Checking MySQL connection..."
mysql -u root -p123456 -e "USE gathernote_db; SELECT COUNT(*) FROM users;" 2>/dev/null
if [ $? -eq 0 ]; then
    echo "✅ MySQL is running and database exists"
else
    echo "❌ MySQL connection failed!"
    echo "   Please ensure MySQL is running and database 'gathernote_db' exists"
    exit 1
fi

# Update passwords
echo ""
echo "🔐 Updating user passwords in database..."
mysql -u root -p123456 gathernote_db < server/update_passwords.sql
if [ $? -eq 0 ]; then
    echo "✅ Passwords updated successfully"
else
    echo "❌ Failed to update passwords"
    exit 1
fi

# Start backend
echo ""
echo "🚀 Starting Backend Server..."
cd server
npm start &
BACKEND_PID=$!
cd ..
sleep 3

# Check if backend is running
echo "🔍 Checking backend status..."
curl -s http://localhost:7004 > /dev/null
if [ $? -eq 0 ]; then
    echo "✅ Backend running at http://localhost:7004"
else
    echo "❌ Backend failed to start"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

# Start frontend
echo ""
echo "🚀 Starting Frontend Server..."
cd client
npm run dev &
FRONTEND_PID=$!
cd ..
sleep 5

# Check if frontend is running
echo "🔍 Checking frontend status..."
curl -s http://localhost:3000 > /dev/null
if [ $? -eq 0 ]; then
    echo "✅ Frontend running at http://localhost:3000"
else
    echo "❌ Frontend failed to start"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 1
fi

echo ""
echo "=========================================="
echo "  ✅ GatherNote is ready!"
echo "=========================================="
echo ""
echo "📱 Open your browser:"
echo "   http://localhost:3000"
echo ""
echo "🔐 Demo Login:"
echo "   Email: daffa@itb.ac.id"
echo "   Password: password123"
echo ""
echo "🛑 To stop servers:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "📚 Documentation:"
echo "   • INTEGRATION_GUIDE.md"
echo "   • API_REFERENCE.md"
echo "   • VISUAL_GUIDE.md"
echo ""
echo "=========================================="
