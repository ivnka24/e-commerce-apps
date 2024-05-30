"use client";
import { ProductType } from "@/app/db/type/type";
import { URI_SERVER } from "@/instanceServer";
import { revalidatePath, revalidateTag } from "next/cache";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import loader from "../assets/loader.json";
interface ProductListProps {
  product: ProductType;
}
export default function ProductList({ product }: ProductListProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handlerAdd = async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(URI_SERVER + `wishlist/${product._id}`, {
        method: "POST",
      });
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      const data = await res.json();
      console.log(data, "<<<<<<");
      // revalidatePath("/wishlist");
      router.replace("/wishlist");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlerMove = (
    slug: string,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    router.push("/products/" + slug);
  };

  return (
    <div
      onClick={(e) => handlerMove(product.slug, e)}
      className="group relative overflow-hidden cursor-pointer"
    >
      <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
        <span className="sr-only">Wishlist</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </button>
      <img
        src={product.thumbnail}
        alt=""
        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
      />
      <div className="relative border border-gray-100 bg-white p-6">
        <span className="whitespace-nowrap bg-sky-600 text-gray-100 px-3 py-1.5 text-xs font-medium">
          {product.tags[0]}
        </span>
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          {product.name}
        </h3>
        <p className="mt-1.5 text-sm text-gray-700">$ {product.price}</p>
        <form className="mt-4">
          <button
            className="block w-full text-gray-100 rounded bg-sky-700 p-4 text-sm font-medium transition hover:scale-105"
            onClick={handlerAdd}
            disabled={loading}
          >
            {loading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Add to Wishlist"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
