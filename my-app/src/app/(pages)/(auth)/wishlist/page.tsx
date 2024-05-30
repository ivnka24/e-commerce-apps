"use client";
import { fetchWishlist } from "@/server-side/fetchwishlist";
import ProductList from "./ProductList";
import React, { useEffect, useState } from "react";
import { MyWishlist } from "@/app/db/type/type";
import { URI_SERVER } from "@/instanceServer";
import { useRouter } from "next/navigation";

export default function Mywishlist() {
  const [data, setData] = useState<MyWishlist[]>([]);
  const route = useRouter();
  const wishlisht = async () => {
    try {
      const data = await fetchWishlist();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [message, setMessage] = useState();
  const deleteItem = async (id: string, e: React.MouseEvent) => {
    try {
      const res = await fetch(URI_SERVER + "wishlist/" + id, {
        method: "DELETE",
        // headers: {
        //   Cookie: cookies().toString(),
        // },
      });
      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await res.json();
      console.log(data, "<<<< data");

      setMessage(data.message);

      await fetchWishlist();
      route.push("/wishlist");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data, "<<<");
  useEffect(() => {
    wishlisht();
  }, []);
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-1 sm:px-4 sm:py-2 lg:px-8">
        <header className="text-center">
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            My Wishlist
          </h2>
          {message && (
            <div
              role="alert"
              className="rounded-xl border border-gray-100 bg-white p-4"
            >
              <div className="flex items-start gap-4">
                <span className="text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>

                <div className="flex-1">
                  <p className="mt-1 text-sm text-gray-700">{message}</p>
                </div>

                <button className="text-gray-500 transition hover:text-gray-600">
                  <span className="sr-only">Dismiss popup</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </header>
        {data.length === 0 ? (
          <div className="flex items-center justify-center text-center mt-8">
          <h1 className="font-bold text-xl">Your wishlist is empty.</h1>
          </div>
        ) : (
          <ul className="mt-3 grid gap-4 sm:grid-cols-5 lg:grid-cols-5">
            {data.map((el) => (
              <ProductList
                key={String(el._id)}
                data={el.Products}
                delete={deleteItem}
                idDelete={String(el._id)}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
