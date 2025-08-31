export const validateFirstname = (firstname) => {
  if (!firstname.trim()) return "First name is required";
  return null;
};

export const validateLastname = (lastname) => {
  if (!lastname.trim()) return "Last name is required";
    return null;
};

export const validateEmail = (email) => {
  if (!email.trim()) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email";
  return null;
};

export const validateUsername = (username) => {
  if (!username.trim()) return "Username is required";
    return null;
};

export const validatePassword = (password) => {
  if (!password.trim()) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  if (!password.match(/[A-Z]/))
    return "Password must contain at least one capital letter";
  if (!password.match(/[a-z]/))
    return "Password must contain at least one lowercase letter";
  if (!password.match(/[0-9]/))
    return "Password must contain at least one number";
  if (!password.match(/[^a-zA-Z0-9]/))
    return "Password must contain at least one special character";
  return null;
};
