import { describe, it, expect } from '@jest/globals';
import { generateOTP } from './common/authUtils';

describe('Auth Utils', () => {
  it('should generate a 6-digit OTP', () => {
    const otp = generateOTP(6);
    expect(otp).toHaveLength(6);
    expect(otp).toMatch(/^\d+$/);
  });
});
