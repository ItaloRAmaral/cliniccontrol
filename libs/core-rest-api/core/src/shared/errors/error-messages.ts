export const PSYCHOLOGIST_ERROR_MESSAGES = {
  CONFLICTING_EMAIL: 'email already exists',
  INVALID_EMAIL: 'email must be an email',
  PSYCHOLOGIST_NOT_FOUND: 'psychologist not found',
  PSYCHOLOGIST_ALREADY_EXISTS: 'psychologist already exists',
  INVALID_CREDENTIALS: 'invalid credentials',
  SAME_PASSWORD: 'new password must be different from the old one',
  SAME_EMAIL: 'new email must be different from the old one',
  NOT_YOUR_PATIENT: 'this patient is not yours',
};

export const CLINIC_ERROR_MESSAGES = {
  CONFLICTING_CREDENTIALS: 'clinic already exists',
  CLINIC_NOT_FOUND: 'clinic not found',
};

export const PATIENT_ERROR_MESSAGES = {
  CONFLICTING_CREDENTIALS: 'patient already exists',
  PATIENT_NOT_FOUND: 'patient not found',
  PATIENT_APPOINTMENT_REGISTRY_NOT_FOUND: 'appointment registry not found',
};

export const APPOINTMENT_ERROR_MESSAGES = {
  CONFLICTING_DATE_TIME: 'appointment already exists at this time',
  APPOINTMENT_NOT_FOUND: 'appointment not found',
  APPOINTMENT_DATE_CHANGE_NOT_ALLOWED: 'appointment date change not allowed',
};
