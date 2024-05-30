import { ObjectId } from "mongodb";
import {
  COLLECTION_PRODUCTS,
  COLLECTION_WISHLIST,
} from "../../config/constanants";
import { runDB } from "../../config/db";
import { DataWishlist, MyWishlist, inputWishlist } from "../../type/type";
import { findProduct } from "../products/product";

interface inputType {
  userId: string;
  productId: string;
}
export const createWishlist = async (
  input: inputType
): Promise<DataWishlist> => {
  try {
    const inputData = {
      userId: new ObjectId(input.userId),
      productId: new ObjectId(input.productId),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const db = await runDB();

    const findProduct = await db
    .collection(COLLECTION_PRODUCTS)
    .findOne({ _id: new ObjectId(input.productId) });
    // console.log(findData);
    // console.log(findProduct);

    if (!findProduct) {
      throw new Error("Gun not found");
    }
    if (!input.userId) {
      throw new Error("userId cannot be null");
    }
    if (!input.productId) {
      throw new Error("productId cannot be null");
    }

    const createadWish = await db
      .collection(COLLECTION_WISHLIST)
      .insertOne(inputData);

    return { _id: createadWish.insertedId, ...inputData };
  } catch (error) {
    throw error;
  }
};

export const listWishlist = async (id: String): Promise<MyWishlist[]> => {
  // console.log(id);

  const db = (await runDB()).collection(COLLECTION_WISHLIST);
  const agg = [
    {
      $match: {
        userId: new ObjectId(id as string),
      },
    },
    {
      $lookup: {
        from: "Products",
        localField: "productId",
        foreignField: "_id",
        as: "Products",
      },
    },
    { $unwind: { path: "$Products" } },
  ];

  const cursor = db.aggregate(agg);
  // console.log(cursor, '<<<<');

  const result = await cursor.toArray();
  // console.log(result, '<<< result');

  return result as MyWishlist[];
};

export const deleteWishlist = async (id: string): Promise<any> => {
  try {
    const db = (await runDB()).collection(COLLECTION_WISHLIST);
    console.log(id, 'ini id');
    
    const checkList = await db.findOne({ _id: new ObjectId(id) });
    if (!checkList) {
      throw new Error("wishlist not found");
    }
    const deletedData = await db.deleteOne({ _id: new ObjectId(id) });
    console.log(deletedData, '<<<<<<<<');
    
    return deletedData;
  } catch (error) {
    throw error;
  }
};
