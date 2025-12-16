# GatherNote - Quick Setup Script (PowerShell)
# Usage: .\quick-setup.ps1

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  GatherNote - Quick Setup & Run" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check MySQL connection
Write-Host "🔍 Checking MySQL connection..." -ForegroundColor Yellow
try {
    $result = mysql -u root -p123456 -e "USE gathernote_db; SELECT COUNT(*) FROM users;" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ MySQL is running and database exists" -ForegroundColor Green
    }
    else {
        throw "MySQL connection failed"
    }
}
catch {
    Write-Host "❌ MySQL connection failed!" -ForegroundColor Red
    Write-Host "   Please ensure MySQL is running and database 'gathernote_db' exists" -ForegroundColor Red
    exit 1
}

# Update passwords
Write-Host ""
Write-Host "🔐 Updating user passwords in database..." -ForegroundColor Yellow
try {
    mysql -u root -p123456 gathernote_db -e "source server/update_passwords.sql" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Passwords updated successfully" -ForegroundColor Green
    }
    else {
        throw "Failed to update passwords"
    }
}
catch {
    Write-Host "❌ Failed to update passwords" -ForegroundColor Red
    exit 1
}

# Start backend
Write-Host ""
Write-Host "🚀 Starting Backend Server..." -ForegroundColor Yellow
$backend = Start-Process -FilePath "powershell" -ArgumentList "-Command", "cd server; npm start" -PassThru -WindowStyle Normal
Start-Sleep -Seconds 5

# Check backend
Write-Host "🔍 Checking backend status..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:7004" -Method Get -TimeoutSec 5 -ErrorAction Stop
    Write-Host "✅ Backend running at http://localhost:7004" -ForegroundColor Green
}
catch {
    Write-Host "❌ Backend failed to start" -ForegroundColor Red
    Stop-Process -Id $backend.Id -Force -ErrorAction SilentlyContinue
    exit 1
}

# Start frontend
Write-Host ""
Write-Host "🚀 Starting Frontend Server..." -ForegroundColor Yellow
$frontend = Start-Process -FilePath "powershell" -ArgumentList "-Command", "cd client; npm run dev" -PassThru -WindowStyle Normal
Start-Sleep -Seconds 8

# Check frontend
Write-Host "🔍 Checking frontend status..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -Method Get -TimeoutSec 5 -ErrorAction Stop
    Write-Host "✅ Frontend running at http://localhost:3000" -ForegroundColor Green
}
catch {
    Write-Host "❌ Frontend failed to start" -ForegroundColor Red
    Stop-Process -Id $backend.Id, $frontend.Id -Force -ErrorAction SilentlyContinue
    exit 1
}

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  ✅ GatherNote is ready!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📱 Open your browser:" -ForegroundColor White
Write-Host "   http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "🔐 Demo Login:" -ForegroundColor White
Write-Host "   Email: daffa@itb.ac.id" -ForegroundColor Yellow
Write-Host "   Password: password123" -ForegroundColor Yellow
Write-Host ""
Write-Host "🛑 To stop servers:" -ForegroundColor White
Write-Host "   Backend PID: $($backend.Id)" -ForegroundColor Yellow
Write-Host "   Frontend PID: $($frontend.Id)" -ForegroundColor Yellow
Write-Host "   Stop-Process -Id $($backend.Id), $($frontend.Id) -Force" -ForegroundColor Gray
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor White
Write-Host "   • INTEGRATION_GUIDE.md" -ForegroundColor Gray
Write-Host "   • API_REFERENCE.md" -ForegroundColor Gray
Write-Host "   • VISUAL_GUIDE.md" -ForegroundColor Gray
Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan

# Keep window open
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor DarkGray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
