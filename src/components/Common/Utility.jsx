import CryptoJS from "crypto-js";
import randomize from "randomatic";

export const Encrypted_Id_Name = (data, key) => {
  const result = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString()
  return result
};

export const Decrypt_Id_Name = (data, key) => {
  const result = JSON.parse(CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8))
  return result
}

export const Aes256Decrypt = async (encryptedData) => {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, AESEnyDecKey, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

export const Aes256Encrypt = async (data) => {
  const encrypted = CryptoJS.AES.encrypt(data, AESEnyDecKey, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

export const get_OTP = () => {
  const OTP = randomize('0', 6);
  return OTP;
}