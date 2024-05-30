import { ObjectId } from "mongodb";
import { COLLECTION_PRODUCTS } from "../../config/constanants";
import { runDB } from "../../config/db";
import { ProductType, Search } from "../../type/type";
// getAll Product
export const getAllProduct = async (): Promise<ProductType[]> => {
  const db = await runDB();
  const productData = (await db
    .collection(COLLECTION_PRODUCTS)
    .find()
    .toArray()) as ProductType[];
  return productData;
};

// get product with query
export const searchProduct = async (
  name: string | null,
  page: number,
  pageSize: number
): Promise<{ products: ProductType[]; total: number }> => {
  try {
    const db = await runDB();
    const query = name ? { name: { $regex: new RegExp(name, "i") } } : {};
    const totalProducts = await db
      .collection(COLLECTION_PRODUCTS)
      .find(query)
      .count();
    const productData = (await db
      .collection(COLLECTION_PRODUCTS)
      .find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray()) as ProductType[];

    if (!productData.length) {
      throw new Error("No weapon found");
    }

    return { products: productData, total: totalProducts };
  } catch (error) {
    throw error;
  }
};
// findProduct
export const findProduct = async (_id: ObjectId): Promise<any> => {
  try {
    console.log(_id, "<<<<<");

    const db = await runDB();
    const findProduct: any = (await db
      .collection(COLLECTION_PRODUCTS)
      .findOne({ _id })) as any;
    // console.log(findProduct, '<<<<');

    return findProduct;
  } catch (error) {
    throw error;
  }
};
// find by slug
export const findBySlug = async (slug: string): Promise<ProductType> => {
  try {
    // console.log(slug, '<<<< slug');

    const db = await runDB();
    const findData = (await db
      .collection(COLLECTION_PRODUCTS)
      .findOne({ slug })) as ProductType;
    // console.log(findData, '<<<< data masuk');

    if (!findData) {
      throw new Error("Gun not found");
    }
    return findData;
  } catch (error) {
    throw error;
  }
};

// product limit
export const productLimit = async (): Promise<ProductType[]> => {
  const db = await runDB();
  const productsCollection = db.collection("Products");

  const cursor = productsCollection.aggregate([{ $limit: 5 }]);
  const result: ProductType[] = (await cursor.toArray()) as ProductType[];
  // console.log(result, '<< result');
  
  return result;
};
