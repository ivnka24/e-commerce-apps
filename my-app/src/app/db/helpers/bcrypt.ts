import bcrypt from "bcryptjs";
export const hashedPass = (hashedPass: string): string => {
  let salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(hashedPass, salt);
};

export const comparePass = (pass: string, hash: string): boolean => {
  return bcrypt.compareSync(pass, hash);
};
