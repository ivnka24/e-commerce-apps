import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { GiPistolGun } from "react-icons/gi";

interface Props {
  hideMenu: boolean;
}

export default function Navbar() {
  const token = cookies().get("Authorization");
  console.log(token, '<<');
  
  const handleLogout = async () => {
    "use server";
    cookies().delete("Authorization");
    redirect("/login");
  };

  return (
    <header className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <a className="block text-sky-950" href="/">
              <span className="sr-only">GunShop</span>
              <GiPistolGun style={{ fontSize: "45px", color: "black" }} />
            </a>
          </div>
          {token?.value ? (
            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-md">
                  <li>
                    <Link
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/products"
                    >
                      Product
                    </Link>
                  </li>

                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/wishlist"
                    >
                      Wishlist Product
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          ) : (
            ""
          )}

          <div className="flex items-center gap-4">
            {token?.value ? (
              <div className="sm:flex sm:gap-4">
                <form action={handleLogout}>
                  <button className="rounded-md bg-orange-700 px-5 py-2.5 text-sm font-medium text-white shadow transition hover:bg-orange-900">
                    Logout
                  </button>
                </form>
              </div>
            ) : (
              <div className="sm:flex sm:gap-4">
                <Link
                  href="/login"
                  className="rounded-md bg-violet-700 px-5 py-2.5 text-sm font-medium text-white shadow transition hover:bg-violet-900"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="rounded-md bg-violet-700 px-5 py-2.5 text-sm font-medium text-white shadow transition hover:bg-violet-900"
                >
                  Register
                </Link>
              </div>
            )}

            <div className="block md:hidden">
              <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
