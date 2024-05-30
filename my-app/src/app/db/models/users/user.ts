import { ObjectId } from "mongodb";

import { COLLECTION_USER } from "../../config/constanants";
import { runDB } from "../../config/db";
import { comparePass, hashedPass } from "../../helpers/bcrypt";
import { sign } from "../../helpers/jwt";
import {
  TokenResponse,
  UserInputType,
  UserLoginType,
  UserType,
} from "../../type/type";
import { JWTPayload } from "jose";

export const RegisterUser = async (user: UserInputType): Promise<any> => {
  try {
    const db = await runDB();
    const inputUser: UserInputType = {
      ...user,
      password: hashedPass(user.password),
    };
    const matchEmail = await emailUser(user.email); //validation email unique
    const matchUsername = await usernameUser(user.username); //validation username unique
    if (matchEmail) {
      throw new Error("email must be unique");
    }
    if (matchUsername) {
      throw new Error("username must be unique");
    }
    const register = await db.collection(COLLECTION_USER).insertOne(inputUser);
    return register;
  } catch (error) {
    throw error;
  }
};

// export const LoginUser = async ()
export const LoginUser = async (
  user: UserLoginType
): Promise<TokenResponse> => {
  try {
    const matchEmail = await emailUser(user.email);
    if (!matchEmail) {
      throw new Error("email/password is invalid");
    }
    const verifPass = comparePass(user.password, matchEmail.password);
    if (!verifPass) {
      throw new Error("email/password is invalid");
    }
    const payload: JWTPayload = {
      id: matchEmail._id,
      username: matchEmail.username,
      name: matchEmail.name,
    };
    const access_token = await sign(payload);
    // console.log(access_token, '<<< access token');

    return { access_token };
  } catch (error) {
    throw error;
  }
};

export const emailUser = async (email: string): Promise<any> => {
  const db = await runDB();
  const findUser = await db
    .collection(COLLECTION_USER)
    .findOne({ email: email });
  return findUser;
};

export const usernameUser = async (username: string): Promise<any> => {
  const db = await runDB();
  const findUser = await db
    .collection(COLLECTION_USER)
    .findOne({ username: username });
  return findUser;
};

export const findUserById = async (_id: ObjectId): Promise<UserType | null> => {
  try {
    const db = await runDB();
    const findData: UserType|null = (await db
      .collection(COLLECTION_USER)
      .findOne({ _id })) as UserType | null;
    if (!findData) {
      throw new Error("Invalid Token");
    }
    return findData as UserType;
  } catch (error) {
    throw error;
  }
};

export const searchUser = async (_id: string): Promise<any> => {
  try {
    const db = await runDB();
    const findData = await db
      .collection(COLLECTION_USER)
      .findOne({ _id: new ObjectId(_id) });
    console.log(findData, "<<<< ada ga");

    if (!findData) {
      throw new Error("Invalid Token");
    }
    return findData;
  } catch (error) {
    throw error;
  }
};
