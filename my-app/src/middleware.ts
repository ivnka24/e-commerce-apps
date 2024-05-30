import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./app/db/helpers/jwt";
import { JWTPayload } from "jose";
import { findUserById } from "./app/db/models/users/user";
import { payload } from "./app/db/type/type";
interface userType {

}
export async function middleware(request: NextRequest) {
  try {
    console.log("running middleware");

    let cookieAuth = cookies().get("Authorization");

    if (!cookieAuth) {
      throw new Error("Invalid Token");
    }
    let token = cookieAuth.value.split(" ")[1];

    const payload = (await verifyToken(token)) as payload;
    if (!payload) {
      throw new Error("Invalid Token");
    }    
    const reqHeaders = new Headers(request.headers);
    reqHeaders.set("x-user-id", String(payload.id));
    return NextResponse.next({
      headers: reqHeaders,
    });
  } catch (error) {
    console.log(error, '<<< error');
    
    if (error instanceof Error) {
      if (error.message === "Invalid Token") {
        return Response.json(
          { errMessage: error.message },
          { status: 401 }
        );
      }
    }
    return Response.json(
      { errMessage: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const config = {
  matcher: ["/api/wishlist/:path*"],
};
