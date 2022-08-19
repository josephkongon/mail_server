import * as bcrypt from 'bcrypt';

export const encodePassword = async (password: string) => {
  const SALT = await bcrypt.genSalt();
  return await bcrypt.hash(password, SALT);
};

export const comparePassword = async (rawPassword: string, hash: string) => {
  return await bcrypt.compare(rawPassword, hash);
};
