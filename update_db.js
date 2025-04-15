const fs = require('fs');
const pool = require('./db');

async function updateDatabase() {
  try {
    console.log('Starting database schema update...');
    
    // Read the SQL file
    const sql = fs.readFileSync('./add_last_message_column.sql', 'utf8');
    
    // Split the SQL into individual statements
    const statements = sql.split(';').filter(statement => statement.trim() !== '');
    
    // Execute each statement
    for (const statement of statements) {
      console.log(`Executing: ${statement.trim().substring(0, 50)}...`);
      await pool.query(statement);
      console.log('Done.');
    }
    
    console.log('Database schema update completed successfully.');
    
    // Query to check if the column was added
    const [columns] = await pool.query(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'chat_rooms' 
      AND COLUMN_NAME = 'last_message'
    `);
    
    if (columns.length > 0) {
      console.log('Verified: last_message column exists in chat_rooms table.');
    } else {
      console.error('Error: last_message column was not created!');
    }
    
    // Make sure all existing rooms have the correct last_message
    console.log('Updating all existing rooms with their latest messages...');
    await pool.query(`
      UPDATE chat_rooms cr
      SET last_message = (
          SELECT content 
          FROM chat_messages cm
          WHERE cm.room_id = cr.id
          ORDER BY created_at DESC 
          LIMIT 1
      )
      WHERE cr.last_message IS NULL;
    `);
    console.log('All rooms updated successfully.');
    
    process.exit(0);
  } catch (error) {
    console.error('Error updating database schema:', error);
    process.exit(1);
  }
}

updateDatabase(); 