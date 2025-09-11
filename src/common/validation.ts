// Core validation types
type ValidationResult = string | boolean;
type ValidationFunction = (value: any, ...args: any[]) => ValidationResult;

// ORI Validation
export const ORIValidator = (ORI: string): string => 
  !ORI?.trim() ? 'Required *' : 
  /^[A-Z]{2}\d{5}00$/.test(ORI.toUpperCase()) ? 'true' : 
  'Please enter a valid format (eg: WV0034500)';

export const ORIValidatorVictim = (ORI?: string | null): string => 
  !ORI?.trim() ? 'true' : ORIValidator(ORI);

export const ORIWarant = (field: string | null): string => 
  !field ? 'true' : ORIValidator(field);

// Required Field Validation
export const RequiredField = (field: any): string => 
  (field === '' || field === null || field === undefined) ? 'Required *' : 'true';

// Name Validation
type NameType = 'FirstName' | 'MiddleName' | 'LastName';

export const NameValidationCharacter = (
  field: string | null | undefined,
  type: NameType,
  firstName?: string | null,
  middleName?: string | null,
  lastName?: string | null
): string => {
  if (!field || field === 'Invalid date' || field.trim() === '') {
    return type === 'LastName' ? 'Required *' : 'true';
  }

  const fieldLower = field.toLowerCase();
  const [first, middle, last] = [
    firstName?.toLowerCase() ?? '',
    middleName?.toLowerCase() ?? '',
    lastName?.toLowerCase() ?? ''
  ];

  const messages: Record<NameType, Record<string, string>> = {
    LastName: {
      [first + middle]: ' should not be the same as First Name and Middle Name *',
      [first]: ' should not be the same as First Name *',
      [middle]: ' should not be the same as Middle Name *'
    },
    FirstName: {
      [last + middle]: ' should not be the same as Last Name and Middle Name *',
      [last]: ' should not be the same as Last Name *',
      [middle]: ' should not be the same as Middle Name *'
    },
    MiddleName: {
      [first + last]: ' should not be the same as First Name and Last Name *',
      [first]: ' should not be the same as First Name *',
      [last]: ' should not be the same as Last Name *'
    }
  };

  return messages[type][fieldLower] || 'true';
};

// Field Format Validation
export const RequiredFieldSpaceNotAllow = (field: string | null | undefined): string => 
  !field || field === 'Invalid date' || field.trim() === '' ? 'Required *' :
  /^[a-zA-Z0-9]+$/.test(field) ? 'true' : 'Space Not Allow';

export const PhoneField = (field: string | null): string => 
  !field ? 'Required *' : 
  field.length === 12 ? 'true' : 
  'Please enter a valid Phone number [876-987-8940]';

export const FaxField = (field: string | null): string =>
  !field ? 'true' :
  field.length === 12 ? 'true' :
  'Please enter a valid Fax number [876-987-8940]';

export const MunicipalityCodeValidator = (code: string | null): string =>
  !code ? 'Required *' :
  /^\d{4}$/.test(code) ? 'true' :
  'Please enter a valid Municipality code';

// Email Validation
export const EmailField = (email?: string | null): string =>
  !email?.trim() ? 'Required *' :
  /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email.toLowerCase()) ? 'true' :
  'Email not valid';

// Password Validation
type PasswordConfig = {
  MaxPasswordAge?: number;
  MinPasswordLength?: number;
  MaxLoginAttempts?: number;
  MinLowerCaseInPassword?: number;
  MinNumericDigitsInPassword?: number;
  MinSpecialCharsInPassword?: number;
  MinUpperCaseInPassword?: number;
  PasswordHistUniquenessDepth?: number;
  PasswordMessageDays?: number;
};

export const MaxPasswordAge = (value: number | null, config: PasswordConfig[]): string => {
  if (value === null || value === undefined) return 'Required *';
  const maxAge = config[0]?.MaxPasswordAge ?? 90;
  return value > 0 && value <= maxAge ? 'true' : `Max Valid for ${maxAge} days`;
};

// Export all validations
export const Validations = {
  ORIValidator,
  ORIValidatorVictim,
  ORIWarant,
  RequiredField,
  NameValidationCharacter,
  RequiredFieldSpaceNotAllow,
  PhoneField,
  FaxField,
  MunicipalityCodeValidator,
  EmailField,
  MaxPasswordAge
} as const;
