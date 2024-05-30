import { ProductType } from "@/app/db/type/type";
import ButtonAdd from "@/components/ButtonAdd";
import { URI_SERVER } from "@/instanceServer";
import { cookies } from "next/headers";

import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;

  const product = await fetch(URI_SERVER + `products/${slug}`, {
    headers: {
      Cookie: cookies().toString(),
    },
  });
  const data = await product.json();
  return {
    title: data.name,
    description: data.excerpt,
    icons : data.thumbnail
  };
}

const fetchingData = async (slug: string): Promise<ProductType | null> => {
  try {
    const res = await fetch(URI_SERVER + `products/${slug}`, {
      headers: {
        Cookie: cookies().toString(),
      },
    });
    if (!res.ok) {
      throw new Error("something went wrong");
    }
    const data: ProductType = (await res.json()) as ProductType;
    // console.log(data, "<<<<");
    return data as ProductType;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default async function ProductDetail({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const data = await fetchingData(slug);
  // console.log(data, '<<<<<');

  return (
    <div className="flex flex-col lg:flex-row gap-16 lg:items-center">
      <div className="flex flex-col gap-8 lg:w-2/4">
        <img
          src={data?.thumbnail}
          alt=""
          className="w-full h-max aspect-square object-cover rounded-xl"
        />
        <div className="flex flex-row justify-between h-24 overflow-x-auto lg:overflow-visible">
          {data?.images.map((el) => (
            <img
              src={el}
              alt=""
              className="w-24 h-24 rounded-md cursor-pointer"
            />
          ))}
        </div>
      </div>
      {/* ABOUT */}
      <div className="flex flex-col gap-4 lg:w-2/4">
        <div>
          <h1 className="text-3xl font-bold">{data?.name}</h1>
          <div className="grid grid-cols-5 mt-1">
            {data?.tags.map((el, index) => (
              <div
                key={index}
                className="rounded-full bg-sky-600 h-15 w-20 flex items-center justify-center"
              >
                <span className="text-white font-semibold">{el}</span>{" "}
              </div>
            ))}
          </div>
        </div>
        <p className="text-gray-700">{data?.description}</p>
        <h6 className="text-2xl font-semibold">$ {data?.price}</h6>
        <div className="flex flex-row items-center gap-12">
          <ButtonAdd params={{ id: String(data?._id) }} />
        </div>
      </div>
    </div>
  );
}
