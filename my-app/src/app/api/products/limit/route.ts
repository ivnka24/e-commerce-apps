import { productLimit } from "@/app/db/models/products/product";

export async function GET() {
  try {
    
    const data = await productLimit();
    // console.log(data);
    
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching limited products:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
