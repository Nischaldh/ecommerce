import bcrypt from "bcryptjs";

export const hashPassword = async (password:string): Promise<string> => {
  const salt : string = await bcrypt.genSalt(10);
  const hashedPassword:string = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (password:string, hashedPassword:string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};