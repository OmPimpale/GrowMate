export const EMAIL_PATTERN =
  /^(?!.*\s)(?=.{1,255}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.(?!([a-zA-Z]{2,})\.\1$)([a-zA-Z]{2,})(\.[a-zA-Z]{2,})?$/;

export const NAME_PATTERN = /^(?!\s)[A-Za-z ]{1,255}(?<!\s)$/;

export const PASSWORD_RULES = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 20,
  UPPERCASE: /[A-Z]/,
  LOWERCASE: /[a-z]/,
  NUMBER: /[0-9]/,
  SPECIAL_CHAR: /[!@#$%^&*(),.?":{}|<>]/,
  NO_LEADING_TRAILING_SPACE: /^(?!\s)(.*)(?<!\s)$/,
};