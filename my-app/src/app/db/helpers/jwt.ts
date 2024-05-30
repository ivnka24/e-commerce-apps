import * as jose from "jose";

const JWT_SECRET: string = process.env.JWT_SECRET as string;
const SECRET = new TextEncoder().encode(JWT_SECRET);

export const sign = (payload: jose.JWTPayload) => {
  const token = new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(SECRET);
  return token
};

export const verifyToken = async (token: string): Promise<jose.JWTPayload> => {
  const {payload} = await jose.jwtVerify(token, SECRET)
  return payload;
};
