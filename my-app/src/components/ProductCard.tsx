import { ProductType } from "@/app/db/type/type";
interface Props {
  product: ProductType;
}

export default function ProductCard({ product }: Props) {
  return (
    <div>
      <img
        src={product.thumbnail}
        alt=""
        className="h-[250px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[350px]"
      />

      <div className="relative bg-white pt-3">
        <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
          {product.name}
        </h3>

        <p className="mt-2">
          <span className="sr-only"> Regular Price </span>

          <span className="tracking-wider text-gray-900">
            {" "}
            ${" "}{product.price}{" "}
          </span>
        </p>
      </div>
    </div>
  );
}
