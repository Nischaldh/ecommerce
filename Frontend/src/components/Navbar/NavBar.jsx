import { assets } from "@/assets/assests";
import { navBarMenu } from "@/constants/constants";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { UserDropDownMenu } from "./UserDropDown";
import { MobileNav } from "./MobileNav";
import { useAuth } from "@/hooks/auth/useAuth";
import { useCart } from "@/hooks/cart/useCart";
import NotificationBell from "./NotificationBell";

const NavBar = () => {
  const { isAuthenticated } = useAuth();
  const { totalItems } = useCart();
  return (
    <>
      <nav>
        {/* Nav containter */}
        <div className="flex items-center justify-between py-4">
          {/* left side logo */}
          <Link className="font-bold shrink-0" to="/">
            <span className="hidden sm:block text-2xl">Ecommerce</span>
            <span className="sm:hidden text-xl text-orange-500 font-extrabold">
              EC
            </span>
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

          <div className="flex items-center  gap-3 sm:gap-6">
            <Link className="relative group" to="/cart">
              <img src={assets.cart} className="size-6 sm:size-7" />

              <span className="absolute -right-1 -bottom-1 bg-orange-500 text-white text-[10px] leading-none w-4 h-4 flex items-center justify-center rounded-full transition-all duration-200 group-hover:bg-orange-100 group-hover:text-gray-500">
                {totalItems || "0"}
              </span>
            </Link>
            {isAuthenticated && 
            <div className="relative">
            <NotificationBell />
            </div>}
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
                <UserDropDownMenu />
              </>
            )}
            <MobileNav />
          </div>
        </div>
      </nav>
      <hr />
    </>
  );
};

export default NavBar;
