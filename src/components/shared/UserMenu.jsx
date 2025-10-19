import { Link } from "react-router-dom";
import { User, Package, XCircle, Star, LogOut } from "lucide-react";
import useAuthStore from "@/store/authStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const UserMenu = () => {
  const { user, logout } = useAuthStore();
  const userName = user?.user_metadata?.full_name || user?.email;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 p-2 h-auto rounded-full hover:bg-gray-100 focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <User size={24} className="text-red-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 bg-black/60 backdrop-blur-lg border-gray-500/50 text-gray-200"
        sideOffset={10}
        align="end"
      >
        <DropdownMenuLabel className="font-medium text-white text-center text-base py-2">
          {userName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-500/50" />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link
            to="/account"
            className="flex items-center gap-3"
          >
            <User size={18} />
            <span>Manage My Account</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="/orders" className="flex items-center gap-3">
            <Package size={18} />
            <span>My Order</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="/cancellations" className="flex items-center gap-3">
            <XCircle size={18} />
            <span>My Cancellations</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="/reviews" className="flex items-center gap-3">
            <Star size={18} />
            <span>My Reviews</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-500/50" />
        <DropdownMenuItem
          onClick={logout}
          className="text-red-400 focus:text-red-400 focus:bg-red-500/20 cursor-pointer flex items-center gap-3"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;