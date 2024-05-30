import Button from "@/components/Button";
import Error from "@/components/ErrorPopUp";
import { URI_SERVER } from "@/instanceServer";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  const addData = async (formData: FormData) => {
    "use server";
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
    if (!response.ok) {
      const errorMessage =
        result.message + "" || "An error occurred during registration.";
      return redirect("/register?error=" + errorMessage);
    }
    return redirect("/login");
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1579978394084-76e4311bc86c?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="#">
              <span className="sr-only">Home</span>
              <svg
                className="h-8 sm:h-10"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 0C6.268 0 0 6.268 0 14c0 5.876 3.72 10.891 8.945 12.814.378.106.765.154 1.155.156 1.265 0 2.426-.607 3.146-1.637l.702-.937.12.094c.428.326.918.543 1.436.621l1.616.258c1.792.287 3.352 1.493 4.087 3.205.242.634.363 1.305.363 1.988V30h3.999v-3.999c0-.687.121-1.357.363-1.991.736-1.713 2.296-2.92 4.087-3.205l1.616-.258c.518-.078 1.008-.295 1.436-.621l.12-.094.702.937c.721 1.03 1.881 1.637 3.146 1.637.39 0 .777-.048 1.155-.156C24.279 24.891 28 19.876 28 14 28 6.268 21.732 0 14 0zm0 3.999c2.759 0 4.999 2.24 4.999 4.999s-2.24 4.999-4.999 4.999c-2.759 0-4.999-2.24-4.999-4.999s2.24-4.999 4.999-4.999zm0 1.999a2.999 2.999 0 00-2.999 2.999c0 1.656 1.343 2.999 2.999 2.999 1.656 0 2.999-1.343 2.999-2.999 0-1.656-1.343-2.999-2.999-2.999z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to Gunshop 🔫
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Register now to explore Gunshop's premium firearm collections and
              exclusive deals. Join our community for priority access to special
              offers and the latest updates.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                href="#"
              >
                <span className="sr-only">Home</span>
                <svg
                  className="h-8 sm:h-10"
                  viewBox="0 0 28 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 0C6.268 0 0 6.268 0 14c0 5.876 3.72 10.891 8.945 12.814.378.106.765.154 1.155.156 1.265 0 2.426-.607 3.146-1.637l.702-.937.12.094c.428.326.918.543 1.436.621l1.616.258c1.792.287 3.352 1.493 4.087 3.205.242.634.363 1.305.363 1.988V30h3.999v-3.999c0-.687.121-1.357.363-1.991.736-1.713 2.296-2.92 4.087-3.205l1.616-.258c.518-.078 1.008-.295 1.436-.621l.12-.094.702.937c.721 1.03 1.881 1.637 3.146 1.637.39 0 .777-.048 1.155-.156C24.279 24.891 28 19.876 28 14 28 6.268 21.732 0 14 0zm0 3.999c2.759 0 4.999 2.24 4.999 4.999s-2.24 4.999-4.999 4.999c-2.759 0-4.999-2.24-4.999-4.999s2.24-4.999 4.999-4.999zm0 1.999a2.999 2.999 0 00-2.999 2.999c0 1.656 1.343 2.999 2.999 2.999 1.656 0 2.999-1.343 2.999-2.999 0-1.656-1.343-2.999-2.999-2.999z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
                Welcome to Gunshop 🔫
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
                Register now to explore Gunshop's premium firearm collections
                and exclusive deals. Join our community for priority access to
                special offers and the latest updates.
              </p>
            </div>
            <Error />

            <form action={addData} className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Username
                </label>

                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  className="mt-1 w-full rounded-md border-zinc-600 bg-gray text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 h-8"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="mt-1 w-full rounded-md border-zinc-600 bg-gray text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 h-8"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Email
                </label>

                <input
                  type="text"
                  name="email"
                  placeholder="enter your email"
                  className="mt-1 w-full rounded-md border-zinc-600 bg-gray text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 h-8"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 border-zinc-600	"
                >
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="enter your password"
                  className="mt-1 w-full rounded-md border-zinc-600 bg-gray text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 h-8 border-zinc-600	"
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-5">
                <Button title={"Create an account"} />

                <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
                  Already have an account?
                  <a
                    href="#"
                    className="text-gray-700 underline dark:text-gray-200"
                  >
                    Log in
                  </a>{" "}
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}
