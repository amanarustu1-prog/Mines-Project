import moment from 'moment';
import CryptoJS from 'crypto-js';
const randomize = require('randomatic');

// Encryption/Decryption Configuration
const AESEnyDecKey = CryptoJS.enc.Utf8.parse('8UHjPgXZzXCGkhxV2QCnooyJexUzvJrO');
const IV = CryptoJS.enc.Utf8.parse('zAvR2NI87bBx746n');
const TRIPLE_DES_KEY = '9z$C&F)J@NcRfTjW';
const TRIPLE_DES_IV = 'QUJDREVGR0g=';

// OTP Related Functions
export const generateOTP = (length = 6): string => {
  return randomize('0', length);
};

// Encryption Functions
export const encryptData = (data: any, key: string = TRIPLE_DES_KEY, iv: string = TRIPLE_DES_IV): string => {
  try {
    const parsedKey = CryptoJS.enc.Utf8.parse(key);
    const parsedIv = CryptoJS.enc.Base64.parse(iv);
    const encrypted = CryptoJS.TripleDES.encrypt(JSON.stringify(data), parsedKey, {
      iv: parsedIv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
};

// Decryption Functions
export const decryptData = (encryptedData: string, key: string = TRIPLE_DES_KEY, iv: string = TRIPLE_DES_IV): any => {
  try {
    const parsedKey = CryptoJS.enc.Utf8.parse(key);
    const parsedIv = CryptoJS.enc.Base64.parse(iv);
    const decrypted = CryptoJS.TripleDES.decrypt(encryptedData, parsedKey, {
      iv: parsedIv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
};

// AES Encryption
export const encryptAES = (data: string): string => {
  const encrypted = CryptoJS.AES.encrypt(data, AESEnyDecKey, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
};

// AES Decryption
export const decryptAES = (encryptedData: string): string => {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, AESEnyDecKey, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

// Token Management
export const storeAuthToken = (token: string): void => {
  try {
    const encryptedToken = encryptAES(token);
    localStorage.setItem('authToken', encryptedToken);
  } catch (error) {
    console.error('Error storing auth token:', error);
    throw new Error('Failed to store authentication token');
  }
};

export const getAuthToken = (): string | null => {
  try {
    const encryptedToken = localStorage.getItem('authToken');
    return encryptedToken ? decryptAES(encryptedToken) : null;
  } catch (error) {
    console.error('Error retrieving auth token:', error);
    return null;
  }
};

export const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
};

// Session Management
export const setSession = (userData: any): void => {
  try {
    const sessionData = {
      user: userData,
      timestamp: moment().valueOf()
    };
    const encryptedSession = encryptData(sessionData);
    localStorage.setItem('userSession', encryptedSession);
  } catch (error) {
    console.error('Error setting session:', error);
    throw new Error('Failed to set user session');
  }
};

export const getSession = (): any => {
  try {
    const encryptedSession = localStorage.getItem('userSession');
    if (!encryptedSession) return null;
    
    const sessionData = decryptData(encryptedSession);
    // Check if session is expired (24 hours)
    const sessionAge = moment().diff(moment(sessionData.timestamp), 'hours');
    if (sessionAge > 24) {
      removeSession();
      return null;
    }
    return sessionData.user;
  } catch (error) {
    console.error('Error getting session:', error);
    removeSession();
    return null;
  }
};

export const removeSession = (): void => {
  localStorage.removeItem('userSession');  
  removeAuthToken();
};

// Password Hashing
export const hashPassword = (password: string): string => {
  return CryptoJS.SHA256(password).toString();
};

// Generate Random String
export const generateRandomString = (length: number = 32): string => {
  return CryptoJS.lib.WordArray.random(length / 2).toString();
};

// Generate CSRF Token
export const generateCSRFToken = (): string => {
  return generateRandomString(32);
};
