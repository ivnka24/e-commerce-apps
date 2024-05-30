import { redirect } from "next/navigation";
import { URI_SERVER } from "@/instanceServer";

export const addData = async (formData: FormData) => {
  const email = formData.get("email");
  const name = formData.get("name");
  const username = formData.get("username");
  const password = formData.get("password");
  const response = await fetch(URI_SERVER + "register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      name,
      username,
      password,
    }),
  });
  const result = await response.json();
  // console.log(result);
  if (!response.ok) {
    const errorMessage =
      result.message + "" || "An error occurred during registration.";
    return redirect("/register?error=" + errorMessage);
  }
  return redirect("/login");
};
