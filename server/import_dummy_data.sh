#!/bin/bash

# GatherNote - Import Dummy Data Script
# Usage: ./import_dummy_data.sh

echo "🗄️  GatherNote - Import Dummy Data"
echo "===================================="
echo ""

# Database credentials (Remote DB via aaPanel)
DB_HOST="127.0.0.1"
DB_PORT="13306"
DB_USER="root"
DB_PASS="admin"
DB_NAME="gathernote_db"
SQL_FILE="dummy_data.sql"

# Check if SQL file exists
if [ ! -f "$SQL_FILE" ]; then
    echo "❌ Error: $SQL_FILE not found!"
    echo "   Make sure you're in the server/ directory"
    exit 1
fi

# Check if mysql command exists
if ! command -v mysql &> /dev/null; then
    echo "❌ Error: MySQL client not installed!"
    echo "   Install: sudo apt-get install mysql-client (Ubuntu/Debian)"
    echo "   Install: brew install mysql-client (macOS)"
    exit 1
fi

echo "📋 Configuration:"
echo "   Host: $DB_HOST"
echo "   Port: $DB_PORT"
echo "   User: $DB_USER"
echo "   Database: $DB_NAME"
echo "   SQL File: $SQL_FILE"
echo ""

# Import data
echo "🚀 Importing data..."
MYSQL_PWD="$DB_PASS" mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" "$DB_NAME" < "$SQL_FILE"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Data imported successfully!"
    echo ""
    echo "📊 Verifying data count..."
    
    MYSQL_PWD="$DB_PASS" mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" "$DB_NAME" -e "
        SELECT 'Users' as Table_Name, COUNT(*) as Total FROM users
        UNION ALL SELECT 'Folders', COUNT(*) FROM folders
        UNION ALL SELECT 'Notes', COUNT(*) FROM notes
        UNION ALL SELECT 'Groups', COUNT(*) FROM groups
        UNION ALL SELECT 'Group Members', COUNT(*) FROM group_members
        UNION ALL SELECT 'Collaborators', COUNT(*) FROM note_collaborators;
    " | column -t
    
    echo ""
    echo "✅ All done! You can now:"
    echo "   1. Start backend: npm run dev"
    echo "   2. Test login: azzam@itb.ac.id / password123"
    echo "   3. Try AI Summarizer with long notes"
    echo ""
else
    echo ""
    echo "❌ Import failed!"
    echo "   Possible issues:"
    echo "   - Database server unreachable"
    echo "   - Wrong credentials"
    echo "   - SQL syntax error"
    echo ""
    exit 1
fi
