# GatherNote - Import Dummy Data Script (PowerShell)
# Usage: .\import_dummy_data.ps1

Write-Host "🗄️  GatherNote - Import Dummy Data" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Database credentials (Remote DB via aaPanel)
$DB_HOST = "127.0.0.1"
$DB_PORT = "13306"
$DB_USER = "root"
$DB_PASS = "admin"
$DB_NAME = "gathernote_db"
$SQL_FILE = "dummy_data.sql"

# Check if SQL file exists
if (-not (Test-Path $SQL_FILE)) {
    Write-Host "❌ Error: $SQL_FILE not found!" -ForegroundColor Red
    Write-Host "   Make sure you're in the server\ directory" -ForegroundColor Yellow
    exit 1
}

# Check if mysql command exists
$mysqlCommand = Get-Command mysql -ErrorAction SilentlyContinue
if (-not $mysqlCommand) {
    Write-Host "❌ Error: MySQL client not installed!" -ForegroundColor Red
    Write-Host "   Download from: https://dev.mysql.com/downloads/mysql/" -ForegroundColor Yellow
    exit 1
}

Write-Host "📋 Configuration:" -ForegroundColor Cyan
Write-Host "   Host: $DB_HOST"
Write-Host "   Port: $DB_PORT"
Write-Host "   User: $DB_USER"
Write-Host "   Database: $DB_NAME"
Write-Host "   SQL File: $SQL_FILE"
Write-Host ""

# Set password as environment variable
$env:MYSQL_PWD = $DB_PASS

# Import data
Write-Host "🚀 Importing data..." -ForegroundColor Yellow
Get-Content $SQL_FILE | mysql -h $DB_HOST -P $DB_PORT -u $DB_USER $DB_NAME

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Data imported successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📊 Verifying data count..." -ForegroundColor Cyan
    
    $verifyQuery = "SELECT 'Users' as Table_Name, COUNT(*) as Total FROM users UNION ALL SELECT 'Folders', COUNT(*) FROM folders UNION ALL SELECT 'Notes', COUNT(*) FROM notes UNION ALL SELECT 'Groups', COUNT(*) FROM groups UNION ALL SELECT 'Group Members', COUNT(*) FROM group_members UNION ALL SELECT 'Collaborators', COUNT(*) FROM note_collaborators;"
    
    echo $verifyQuery | mysql -h $DB_HOST -P $DB_PORT -u $DB_USER $DB_NAME
    
    Write-Host ""
    Write-Host "✅ All done! You can now:" -ForegroundColor Green
    Write-Host "   1. Start backend: npm run dev" -ForegroundColor White
    Write-Host "   2. Test login: azzam@itb.ac.id / password123" -ForegroundColor White
    Write-Host "   3. Try AI Summarizer with long notes" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Import failed!" -ForegroundColor Red
    Write-Host "   Possible issues:" -ForegroundColor Yellow
    Write-Host "   - Database server unreachable" -ForegroundColor White
    Write-Host "   - Wrong credentials" -ForegroundColor White
    Write-Host "   - SQL syntax error" -ForegroundColor White
    Write-Host ""
    exit 1
}

# Clear password from environment
$env:MYSQL_PWD = ""
