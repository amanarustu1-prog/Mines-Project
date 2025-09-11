const { generateOTP } = require('./authUtils');

// Test OTP generation
const testOTP = generateOTP(6);
console.log('Generated OTP:', testOTP);
console.log('OTP Length:', testOTP.length);

// Verify the OTP contains only numbers
const isNumeric = /^\d+$/.test(testOTP);
console.log('Is OTP numeric?', isNumeric);
