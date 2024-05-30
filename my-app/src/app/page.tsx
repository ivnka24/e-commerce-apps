import ProductCard from "@/components/ProductCard";
import { URI_SERVER } from "@/instanceServer";
import { ProductType } from "./db/type/type";
import Navbar from "@/components/Navbar";
const fetchData = async (): Promise<ProductType[]> => {
  const res = await fetch(URI_SERVER + "products/limit");

  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  const data = await res.json();
  return data;
};
export default async function Home() {
  let data = await fetchData();

  return (
    <>
      <Navbar />
      <div>
        {/* Bannner Promo */}
        <div className="bg-sky-950 px-4 py-3 text-white">
          <p className="text-center text-sm font-medium">
            Discover Unmatched Firearm Excellence at Gunshop: Your Premier
            Destination for Quality Arms and Exclusive Deals{" "}
            <a href="#" className="inline-block underline">
              Check out this new course!
            </a>
          </p>
        </div>
        {/* End Banner Promo */}
        {/* Landing Page*/}
        <section className="relative bg-[url(https://images.unsplash.com/photo-1595590426346-a9d0348d802f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

          <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
            <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
              <h1 className="text-3xl font-extrabold text-teal-50 sm:text-5xl">
                Welcome to
                <strong className="block font-extrabold text-sky-600">
                  {" "}
                  GunShop
                </strong>
              </h1>

              <p className="mt-4 max-w-lg text-teal-50 sm:text-xl/relaxed">
                Explore a world of firearms and accessories tailored to your
                shooting needs. Let us guide you to your perfect gear for your
                next adventure.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 text-center justify-center">
                <a
                  href="#"
                  className="block w-full rounded bg-sky-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-sky-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                >
                  Find Your Gear!
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* end Landing */}
        {/* Feature Product */}
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <header className="text-center">
              <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Firearm Essentials Collection
              </h2>

              <p className="mx-auto mt-4 max-w-md text-gray-500">
                Get ready for precision and reliability with our handpicked
                Firearm Essentials Collection. Each item is chosen for top
                performance and safety, giving you the tools for any shooting
                situation. Explore now for your perfect fit!
              </p>
            </header>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {data.map((el: ProductType, i: number) => (
                <ProductCard key={i} product={el} />
              ))}
            </ul>
            <button className="mt-4 mx-auto block bg-sky-700 hover:bg-sky-900 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              See Details
            </button>
          </div>
        </section>
        {/* End Feature Product */}
      </div>
    </>
  );
}
