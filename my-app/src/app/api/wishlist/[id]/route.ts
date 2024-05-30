import { DataWishlist, MyResponse } from "@/app/db/type/type";
import {
  createWishlist,
  deleteWishlist,
} from "@/app/db/models/wishlist/wishtlist";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

export async function POST<T extends DataWishlist>(
  request: NextRequest,
  { params }: Params
): Promise<void | Response> {
  try {
    const headerList = headers();
    const userId = headerList.get("x-user-id") as string;

    const inputData = {
      userId: userId,
      productId: params.id,
    };

    const wishlist = await createWishlist(inputData);

    const response: MyResponse<DataWishlist> = {
      data: wishlist,
      message: "Wishlist created successfully",
    };

    return NextResponse.json(response, {
      status: 201,
    }) as unknown as Promise<void | Response>;
  } catch (error) {
    if (error instanceof Error) {
      const response: MyResponse<T> = {
        error: error.message,
      };
      return NextResponse.json(response, {
        status: 400,
      }) as unknown as Promise<void | Response>;
    } else {
      const response: MyResponse<T> = {
        error: "Internal Server Error",
      };
      return NextResponse.json(response, {
        status: 500,
      }) as unknown as Promise<void | Response>;
    }
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: Params
): Promise<void | Response> {
  try {
    const { id } = params;

    const deleteData = await deleteWishlist(id);
    if (deleteData.deletedCount == 0) {
      return NextResponse.json(
        { message: "Cannot delete this data" },
        { status: 400 }
      ) as unknown as Promise<void | Response>;
    }
    return NextResponse.json(
      { message: "Delete Wishlist Success" },
      { status: 200 }
    ) as unknown as Promise<void | Response>;
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 404 }
      ) as unknown as Promise<void | Response>;
    }
  }
}
