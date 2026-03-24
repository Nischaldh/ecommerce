import { assets } from "@/assets/assests";
import { navBarMenu } from "@/constants/Links";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { UserDropDownMenu } from "./UserDropDown";
import { MobileNav } from "./MobileNav";
import { useAuth } from "@/hooks/auth/useAuth";

const NavBar = () => {
  const {  isAuthenticated } = useAuth();
  return (
    <>
      <nav>
        {/* Nav containter */}
        <div className="flex items-center justify-between py-4">
          {/* left side logo */}
          <Link className="text-2xl font-bold shrink-0" to="/">
            <p>Ecommerce</p>
          </Link>
          {/* middle pages */}
          <ul className="hidden md:flex items-center gap-6 text-gray-600">
            {navBarMenu.map((item) => {
              return (
                <li key={item.id}>
                  <Link
                    to={item.link}
                    className="py-1 px-3 hover:text-orange-500 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
          {/* right side icons */}
          <div className="flex items-center  gap-3 sm:gap-6">
            <Link className="relative group" to="/cart">
              <img src={assets.cart} className="size-6 sm:size-7" />

              <span className="absolute -right-1 -bottom-1 bg-orange-500 text-white text-[10px] leading-none w-4 h-4 flex items-center justify-center rounded-full transition-all duration-200 group-hover:bg-orange-100 group-hover:text-gray-500">
                0
              </span>
            </Link>
            {!isAuthenticated ? (
              <Link to="/login">
                <Button
                  variant="outline"
                  className="bg-orange-500 text-white hover:bg-orange-100 cursor-pointer h-7.5"
                >
                  Login
                </Button>
              </Link>
            ) : (
              <>
                <UserDropDownMenu/>
              </>
            )}
            <MobileNav />
          </div>
        </div>
      </nav>
      <hr/>
    </>
  );
};

export default NavBar;
