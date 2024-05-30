import { findBySlug } from "@/app/db/models/products/product";
import { ProductType } from "@/app/db/type/type";
import { NextRequest, NextResponse } from "next/server";
interface Params {
  params: {
    slug: string;
  };
}
export async function GET(request: NextRequest, { params }: Params) {
  try {
    console.log('sampee sluggggg');
    
    const { slug } = params;
    const findData = (await findBySlug(slug)) as ProductType;
    return NextResponse.json(findData, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, {status: 404});
    }
    return NextResponse.json({errorMsg : 'Internal Server Error'}, {status: 500})
  }
}