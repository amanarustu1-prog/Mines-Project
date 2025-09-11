// ==========================
// Validation Utility Functions
// ==========================
export const ValidationUtils = {
  // Check if a string is empty
  isEmpty: (value: string): boolean => {
    return !value || value.trim() === '';
  },

  // Validate email format
  isEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate phone number (10 digits)
  isPhone: (phone: string): boolean => {
    const phoneRegex = /^[0-9]{10}$/;
    console.log(phoneRegex.test(phone));
    return phoneRegex.test(phone);
  },

  // Validate PAN number (5 letters, 4 numbers, 1 letter)
  isPan: (pan: string): boolean => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    console.log(panRegex.test(pan));
    return panRegex.test(pan);
  
  },

  // Validate Pincode (6 digits)
  isPincode: (pincode: string): boolean => {
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    return pincodeRegex.test(pincode);
  },

  // Validate GSTIN (15 characters, alphanumeric)
  isGSTIN: (gstin: string): boolean => {
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstinRegex.test(gstin);
  },

  // Validate required fields
  validateRequired(fields: Record<string, any>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    Object.entries(fields).forEach(([fieldName, value]) => {
      if (ValidationUtils.isEmpty(value)) {
        errors.push(`${fieldName} is required`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
    };
  },
};

// ==========================
// Form Validation Helper
// ==========================
export const validateForm = (
  fields: Record<string, any>,
  validations: Record<string, Function>
): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  Object.entries(validations).forEach(([fieldName, validateFn]) => {
    const value = fields[fieldName];
    const error = validateFn(value);
    if (error) {
      errors[fieldName] = error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// ==========================
// Create Validator Factory
// ==========================
export const createValidator = (rules: Record<string, Function>) => {
  return (data: Record<string, any>) => {
    const errors: Record<string, string> = {};

    Object.entries(rules).forEach(([field, validateFn]) => {
      const error = validateFn(data[field], data);
      if (error) {
        errors[field] = error;
      }
    });

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };
};

// ==========================
// Common Validation Rules
// ==========================
export const Rules = {
  required:
    (fieldName: string) =>
    (value: any) =>
      !value || (typeof value === 'string' && value.trim() === '')
        ? `${fieldName}`
        : null,

  email: (value: string) =>
    value && !ValidationUtils.isEmail(value)
      ? 'Please enter a valid email address'
      : null,

  phone: (value: string) =>
    value && !ValidationUtils.isPhone(value)
      ? 'Please enter a valid 10-digit phone number'
      : null,

  pan: (value: string) =>
    value && !ValidationUtils.isPan(value)
      ? 'Please enter a valid PAN number (e.g., ABCDE1234F)'
      : null,

  pincode: (value: string) =>
    value && !ValidationUtils.isPincode(value)
      ? 'Please enter a valid 6-digit pincode'
      : null,
};
