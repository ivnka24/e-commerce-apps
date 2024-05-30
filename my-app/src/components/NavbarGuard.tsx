import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

const NavbarGuard: React.FC<Props> = ({ children }) => {
  const token = cookies().get("Authorization");

  if (!token) {
    redirect('/login');
  }

  return <>{children}</>;
};

export default NavbarGuard;
