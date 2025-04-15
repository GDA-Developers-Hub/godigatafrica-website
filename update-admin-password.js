const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function updateAdminPassword() {
  const pool = mysql.createPool(
    process.env.DATABASE_URL
      ? { uri: process.env.DATABASE_URL }
      : {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD || process.env.DB_PASSword,
          database: process.env.DB_NAME,
          port: process.env.DB_PORT,
          ssl: {
            rejectUnauthorized: true,
          },
        }
  );

  try {
    // Generate new password hash
    const password = 'Admin@123';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('New hash:', hashedPassword);

    // Update admin password
    const [result] = await pool.query(
      'UPDATE admins SET password = ? WHERE email = ?',
      [hashedPassword, 'admin@godigitalafrica.com']
    );

    console.log('Update result:', result);
    console.log('Rows affected:', result.affectedRows);
    
    if (result.affectedRows > 0) {
      console.log('✅ Admin password updated successfully!');
    } else {
      console.log('❌ No admin found with that email.');
    }
  } catch (error) {
    console.error('Error updating admin password:', error);
  } finally {
    // Close the pool
    await pool.end();
  }
}

updateAdminPassword(); 