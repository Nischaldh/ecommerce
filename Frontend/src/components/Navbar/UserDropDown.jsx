import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/auth/useAuth";
import { ListOrdered, LogOutIcon, UserIcon } from "lucide-react";
import { Link } from "react-router-dom";

export const UserDropDownMenu = () => {
  const { user, logout } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage src={user?.profilePic} alt="shadcn" />
            <AvatarFallback>
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <div className="px-2 py-1.5">
          <p className="text-sm font-semibold">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>

        <DropdownMenuSeparator/>

        <DropdownMenuGroup>
          <DropdownMenuItem>
          <Link to='/profile' className="cursor-pointer flex gap-2"> 
            <UserIcon />
            Profile
          </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
          <Link to="/orders" className="cursor-pointer flex gap-2">
            <ListOrdered />
            Orders
          </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-red-500 cursor-pointer focus:text-red-500 focus:bg-red-50">
          <LogOutIcon />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
