import { RegisterUser } from "@/app/db/models/users/user";
import { userValidation } from "@/app/db/models/users/validation";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const validate = userValidation.safeParse(data);
    if (!validate.success) {
      throw validate.error;
    }
    const newUser = await RegisterUser(data);
    console.log(newUser, "<<<<< ");
    // if(newUser)

    return Response.json(
      { status: 201, message: "You succesfully register" },
      { status: 201, statusText: "Register OKE!" }
    );
  } catch (error) {
    console.log(error, "<<< di route");

    if (error instanceof z.ZodError) {
      const errPath = error.issues[0].path[0] as string;
      const errMessage = error.issues[0].message;

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


