import { ProductType } from "@/app/db/type/type";
import React from "react";

interface ProductListProps {
  data: ProductType;
  delete: (id: string, e: React.MouseEvent) => void;
  idDelete: string;
}

export default function ProductList({
  data,
  delete: deleteItem,
  idDelete,
}: ProductListProps) {
  return (
    <a href="#" className="group relative block overflow-hidden">
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
        src={data.thumbnail}
        alt=""
        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
      />
      <div className="relative border border-gray-100 bg-white p-6">
        <span className="whitespace-nowrap bg-sky-600 text-gray-100 px-3 py-1.5 text-xs font-medium">
          {data.tags[0]}
        </span>
        <h3 className="mt-4 text-lg font-medium text-gray-900">{data.name}</h3>
        <p className="mt-1.5 text-sm text-gray-700">${data.price}</p>
        <form className="mt-4">
          <button
            onClick={(e) => deleteItem(String(idDelete), e)}
            className="block w-full text-gray-100 rounded bg-rose-600 p-4 text-md font-medium transition hover:scale-105"
          >
            Remove
          </button>
        </form>
      </div>
    </a>
  );
}
