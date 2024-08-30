const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmail(email: string) {
  return emailRegex.test(email);
}
