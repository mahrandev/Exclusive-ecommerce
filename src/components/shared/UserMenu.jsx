import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { User, Package, XCircle, Star, LogOut } from "lucide-react";
import { toast } from "sonner";
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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const userName = user?.user_metadata?.full_name || user?.email;

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      const result = await logout();

      if (result.success) {
        toast.success(
          t("userMenu.logoutSuccess") || "Logged out successfully!",
        );
        navigate("/");
      } else {
        toast.error(t("userMenu.logoutFailed") || "Failed to logout");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(t("userMenu.logoutFailed") || "Failed to logout");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-auto items-center gap-2 rounded-full p-2 hover:bg-gray-100 focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <User size={24} className="text-red-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 border-gray-500/50 bg-black/60 text-gray-200 backdrop-blur-lg"
        sideOffset={10}
        align="end"
      >
        <DropdownMenuLabel className="py-2 text-center text-base font-medium text-white">
          {userName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-500/50" />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="/account" className="flex items-center gap-3">
            <User size={18} />
            <span>{t("userMenu.manageAccount")}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="/orders" className="flex items-center gap-3">
            <Package size={18} />
            <span>{t("userMenu.myOrder")}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="/cancellations" className="flex items-center gap-3">
            <XCircle size={18} />
            <span>{t("userMenu.myCancellations")}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="/reviews" className="flex items-center gap-3">
            <Star size={18} />
            <span>{t("userMenu.myReviews")}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-500/50" />
        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex cursor-pointer items-center gap-3 text-red-400 focus:bg-red-500/20 focus:text-red-400"
        >
          <LogOut size={18} />
          <span>
            {isLoggingOut
              ? t("userMenu.loggingOut") || "Logging out..."
              : t("userMenu.logout")}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
