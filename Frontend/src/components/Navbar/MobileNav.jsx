import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { navBarMenu } from "@/constants/Links";
import { Menu, Home, ShoppingBag, Users, ListOrdered, LogOutIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/auth/useAuth";

const navIcons = {
  "Home": <Home className="size-7" />,
  "Products": <ShoppingBag className="size-7" />,
  "Sellers": <Users className="size-7" />,
};

export const MobileNav = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="md:hidden p-1">
          <Menu className="w-6 h-6" />
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-64 p-6 flex flex-col">

        {/* User section at top — avatar links to profile, orders below */}
        {isAuthenticated && (
          <div className="flex flex-col gap-3 pb-4 border-b mt-6">

            {/* Avatar + name — clicking opens profile */}
            <SheetClose asChild>
              <Link to="/profile" className="flex items-center gap-2 px-2">
                <Avatar className="size-10">
                  <AvatarImage src={user?.profilePic} />
                  <AvatarFallback>
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="font-semibold text-sm">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </Link>
            </SheetClose>

            {/* Orders link directly below user info */}
            <SheetClose asChild>
              <Link
                to="/orders"
                className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-orange-50 hover:text-orange-500 transition-colors text-gray-700"
              >
                <ListOrdered className="size-7" />
                <p className="text-lg">Order</p>
              </Link>
            </SheetClose>
          </div>
        )}

        {/* Nav links */}
        <nav className="flex-1 mt-6">
          <ul className="flex flex-col gap-5 text-lg">
            {navBarMenu.map((link) => (
              <li key={link.id}>
                <SheetClose asChild>
                  <Link
                    to={link.link}
                    className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-orange-50 hover:text-orange-500 transition-colors text-gray-700"
                  >
                    {navIcons[link.title]}
                    {link.title}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom — login/signup or logout */}
        <div className="pt-4 border-t mt-auto flex flex-col gap-2">
          {!isAuthenticated ? (
            <>
              <SheetClose asChild>
                <Link to="/login">
                  <Button className="w-full bg-orange-500 text-white hover:bg-orange-600">
                    Login
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link to="/signup">
                  <Button variant="outline" className="w-full">
                    Create Account
                  </Button>
                </Link>
              </SheetClose>
            </>
          ) : (
            <SheetClose asChild>
              <button
                onClick={logout}
                className="flex items-center gap-3 w-full py-2 px-3 rounded-md text-left text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOutIcon className="size-4" />
                Sign Out
              </button>
            </SheetClose>
          )}
        </div>

      </SheetContent>
    </Sheet>
  );
};