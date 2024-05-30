import { listWishlist } from "@/app/db/models/wishlist/wishtlist";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const headerList = headers();
    const userId = headerList.get("x-user-id") as string;

    const data = await listWishlist(userId);

    return NextResponse.json(data, { status: 200, statusText: "GASSS!!!!" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
  }
}
