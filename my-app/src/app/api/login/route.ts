import { LoginUser } from "@/app/db/models/users/user";
import {
  type NextRequest as request,
  NextResponse as response,
} from "next/server";
import { loginValidation } from "@/app/db/models/users/validation";
import { z } from "zod";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const validate = loginValidation.safeParse(data);
    if (!validate.success) {
      throw validate.error;
    }

    const loginUser = await LoginUser(data);
    const access_token = loginUser.access_token;
    //! --- setCookies
    // const token = ({access_token : loginUser.access_token});
    // console.log(token, '<<<<');

    cookies().set('Authorization', `Bearer ${access_token}`)
    // token.cookies.set("Authorization", `Bearer ${access_token}`);
    return Response.json({access_token}, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // const errPath = error.issues[0].path[0] as string;
      const errMessage = error.issues[0].message;
      console.log(error, "<<< error kenapa brow");

      return Response.json(
        {
          message: `${errMessage}`,
        },
        {
          status: 400,
        }
      );
    }

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
    return Response.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
        statusText: "INTERNAL SERVER ERROR BROW",
      }
    );
  }
}
