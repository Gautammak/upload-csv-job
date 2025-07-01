const validator = require('validator');

exports.validateRegisterInput = ({ name, email, password }) => {
  const errors = [];

  if (!name || !validator.isAlpha(name.replace(/\s/g, ''))) {
    errors.push('Name is required and must be alphabetic');
  }

  if (!email || !validator.isEmail(email)) {
    errors.push('Valid email is required');
  }

  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  return errors;
};

exports.validateLoginInput = ({ email, password }) => {
  const errors = [];

  if (!email || !validator.isEmail(email)) {
    errors.push('Valid email is required');
  }

  if (!password) {
    errors.push('Password is required');
  }

  return errors;
};
exports.validateCSV = (row) => {
  const name = row.name?.trim();
  const email = row.email?.trim();
  const phone = row.phone?.trim();
  const age = row.age?.trim();
  const city = row.city?.trim();

  const errors = [];

  if (!name || !validator.isAlpha(name.replace(/\s/g, ''))) {
    errors.push('Name is required and must be alphabetic');
  }

  if (!email || !validator.isEmail(email)) {
    errors.push('Invalid or missing email');
  }

  if (phone && !validator.isMobilePhone(phone, 'en-IN')) {
    errors.push('Invalid phone format');
  }

  if (age && !validator.isInt(age)) {
    errors.push('Age must be a number');
  }

  return {
    isValid: errors.length === 0,
    data: { name, email, phone: phone || undefined, age: age ? Number(age) : undefined, city },
    errors
  };
};
