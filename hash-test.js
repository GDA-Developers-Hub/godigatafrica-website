const bcrypt = require('bcryptjs');

const storedHash = '$2a$10$IzkzYQpQVL6QY1G3vqh4WuXwgHKXvt2TBkWQjqhEj9Odcjw2DKVgK';
const password = 'Admin@123';

// Test password comparison
bcrypt.compare(password, storedHash)
  .then(isMatch => {
    console.log('Password match:', isMatch ? 'Yes' : 'No');
    
    // Generate a new hash for the same password
    return bcrypt.hash(password, 10);
  })
  .then(newHash => {
    console.log('Original hash:', storedHash);
    console.log('New hash:', newHash);
  })
  .catch(err => {
    console.error('Error:', err);
  }); 