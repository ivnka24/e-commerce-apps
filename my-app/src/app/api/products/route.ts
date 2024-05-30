import { searchProduct } from "@/app/db/models/products/product";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const query = searchParams.get("name");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "6", 10);
    const search = await searchProduct(query, page, pageSize);

    return Response.json(search, { status: 200 });
  } catch (error) {
    console.log(error, ">>>>> di route");

    if (error instanceof Error) {
      return Response.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }
  }
}
