"use client";
import { ProductType } from "@/app/db/type/type";
import ProductList from "@/components/ProductList";
import { URI_SERVER } from "@/instanceServer";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDebounce } from "use-debounce";

export default function Product() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const PAGE_SIZE = 5;
  const [error, setError] = useState<string>("");
  const [search] = useDebounce(searchQuery, 1500);

  const fetchData = async (pageNum: number, pageSize: number) => {
    try {
      let res;
      if (searchQuery) {
        console.log("masuk 1");

        res = await fetch(
          `${URI_SERVER}products?name=${encodeURIComponent(search)}`
        );
      } else {
        console.log("masukkk 2");

        res = await fetch(
          `${URI_SERVER}products?page=${pageNum}&pageSize=${pageSize}`
        );
        setError("");
      }
      // console.log(await res.json(), '<<<< ngawur');

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }
      const data: { products: ProductType[]; total: number } = await res.json();
      // console.log(data, '<<<<');
      console.log(data, "<<<<< data");

      if (pageNum === 1) {
        setProducts(data.products);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
      }
      setTotalProducts(data.total);
      setCurrentPage(pageNum);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        setProducts([])
        setError(error.message);
      }
    }
  };
  console.log(currentPage, "<<< page");

  const handleNext = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= Math.ceil(totalProducts / PAGE_SIZE)) {
      fetchData(nextPage, PAGE_SIZE);
    }
  };

  const handleSearch = async () => {
    // setProducts([]);
    // setCurrentPage(1);
    // fetchData(1, PAGE_SIZE);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  // console.log(products, "<<<<");

  useEffect(() => {
    fetchData(1, PAGE_SIZE);
  }, []);

  useEffect(() => {
    fetchData(1, PAGE_SIZE);
  }, [search]);

  return (
    <section className="flex-wrap items-center max-w-screen max-h-screen flex justify-evenly">
      {/* Bagian pencarian */}
      <header className="w-full lg:w-8/12 px-2 py-4 sm:px-2 sm:py-12 lg:px-8 flex justify-center items-center">
        <div className="mr-1.5">
          <input
            type="text"
            className="rounded-lg border-1 border-sky-950 border-solid ring-1 ring-sky-700 hover:ring-sky-950 px-3 py-1"
            placeholder="Search product"
            value={searchQuery}
            onChange={handleInputChange}
          />
        </div>
        <button
          className="ml-2 px-4 py-2 bg-sky-950 text-white rounded-md hover:bg-sky-700"
          onClick={handleSearch}
        >
          Search
        </button>
      </header>

      {/* Bagian daftar produk */}
      <div className="w-full lg:w-8/12 px-2 py-8 sm:px-2 sm:py-12 lg:px-8 max-w-screen-xl justify-between">
        <InfiniteScroll
          dataLength={products.length}
          next={handleNext}
          hasMore={currentPage * PAGE_SIZE < totalProducts}
          loader={
            error ? (
              ""
            ) : (
              <h4 className="text-center text-xl text-gray-500">Loading...</h4>
            )
          }
        >
          {/* Pesan kesalahan */}
          {/* {error && (
              <div className="h-96 flex items-center justify-center">
                <h4 className="text-center text-xl text-bold text-red-500">
                  {error}
                </h4>
              </div>
            )} */}

          {/* Daftar produk */}
          {products.length === 0 && (
            <div className="h-96 flex items-center justify-center">
              <h4 className="text-center text-xl text-bold text-gray-500">
                No weapon found
              </h4>
            </div>
          )}

          <ul className="mt-4 flex grid gap-2 sm:grid-cols-5 lg:grid-cols-4">
            {products.map((product: ProductType, i) => (
              <ProductList key={String(product._id)} product={product} />
            ))}
          </ul>
        </InfiniteScroll>
      </div>
    </section>
  );
}
