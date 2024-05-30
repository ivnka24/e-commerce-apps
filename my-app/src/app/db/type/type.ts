import { JWTPayload } from "jose";
import { ObjectId } from "mongodb";

//  USERS
export interface UserType {
  id: ObjectId;
  username: string;
  name: string;
  email: string;
  password: string;
}

export interface payload extends JWTPayload{
  id: ObjectId;
  username: string;
  name: string;
}

export type UserInputType = Omit<UserType, "_id">;
export type UserLoginType = Pick<
  UserType,
  Exclude<keyof UserType, "username" | "name" | "id">
>;

// access_Token return

export interface TokenResponse {
  access_token: string;
}

// END USER

// PRODUCT
export interface ProductType {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Search {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}
// END PRODUCT

// WISHLIST

export interface DataWishlist {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type inputWishlist = Omit<
  DataWishlist,
  "createdAt" | "updatedAt" | "_id"
>;

export interface MyWishlist {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  Products : ProductType
}

// END WISHLIST

// myResponse

export interface MyResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}
