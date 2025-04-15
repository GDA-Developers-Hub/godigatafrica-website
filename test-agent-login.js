const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Get API base URL from environment or use default
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000/api';

console.log('=== AGENT LOGIN TEST SCRIPT ===');
console.log('API Base URL:', API_BASE_URL);

// Test credentials (edit these to match your test account)
const testCredentials = {
  email: 'agent@example.com', // Replace with a real test agent email
  password: 'password123'     // Replace with the corresponding password
};

console.log('Test credentials:', {
  email: testCredentials.email,
  password: '********' // Masked for security
});

async function testAgentLogin() {
  try {
    console.log(`\nAttempting login to ${API_BASE_URL}/agent-auth/login`);
    console.log('Request body:', {
      email: testCredentials.email,
      password: '********' // Masked for security
    });

    // Make login request
    const response = await axios.post(`${API_BASE_URL}/agent-auth/login`, testCredentials);
    
    console.log('\nResponse status:', response.status);
    console.log('Response structure:', {
      success: response.data.success,
      hasToken: !!response.data.token,
      hasUser: !!response.data.user,
      message: response.data.message || 'No message provided'
    });

    if (response.data.success) {
      console.log('\nLogin successful!');
      console.log('Token (first 20 chars):', response.data.token.substring(0, 20) + '...');
      
      if (response.data.user) {
        console.log('User data structure:', 
          Object.keys(response.data.user).reduce((acc, key) => {
            acc[key] = key.includes('password') ? '[REDACTED]' : 
                      (response.data.user[key] ? 
                        (typeof response.data.user[key] === 'object' ? 
                          'Object' : response.data.user[key]) : 
                        'null');
            return acc;
          }, {})
        );
      }

      // Now verify the token works by making a profile request
      console.log('\nVerifying token with profile endpoint...');
      const profileResponse = await axios.get(
        `${API_BASE_URL}/agent-auth/profile`,
        {
          headers: {
            'x-auth-token': response.data.token
          }
        }
      );

      console.log('Profile response status:', profileResponse.status);
      console.log('Profile data structure:', {
        success: profileResponse.data.success,
        hasAgent: !!profileResponse.data.agent
      });

      if (profileResponse.data.success && profileResponse.data.agent) {
        console.log('Agent profile data:',
          Object.keys(profileResponse.data.agent).reduce((acc, key) => {
            acc[key] = profileResponse.data.agent[key] || 'null';
            return acc;
          }, {})
        );
        console.log('\nVerification successful - token works correctly!');
      } else {
        console.log('\nVerification failed - token did not work for profile endpoint');
      }
    } else {
      console.log('\nLogin failed:', response.data.message || 'No error message provided');
    }
  } catch (error) {
    console.error('\nError during login test:');
    
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received. Request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    
    console.error('Error stack:', error.stack);
  }
}

// Run the test
testAgentLogin().then(() => {
  console.log('\n=== TEST COMPLETE ===');
}); 