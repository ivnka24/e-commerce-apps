import { MyWishlist } from "@/app/db/type/type";
import { URI_SERVER } from "@/instanceServer";

export const fetchWishlist = async (): Promise<MyWishlist[]> => {
  try {
    const res = await fetch(URI_SERVER + "wishlist", {
      method: "get",
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    const data = (await res.json()) as MyWishlist[];
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
