"use client";

import { Search, Bell, Plus, User, HelpCircle, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-border/50 bg-background/80 px-4 md:px-8 backdrop-blur-xl">
      <div className="flex items-center gap-4 flex-1 max-w-[600px]">
        <SidebarTrigger className="text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors shrink-0 cursor-pointer" />
        
        <div className="relative flex-1 block">
          <div className="relative group">
            <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-[18px] md:h-[18px] text-muted-foreground/60 z-10" />
            <Input 
              type="text" 
              placeholder="Search assets..." 
              className="w-full pl-10 md:pl-12 rounded-full bg-muted border-none h-10 md:h-11 focus-visible:ring-1 focus-visible:ring-primary/20"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6 ml-4">
        <div className="flex items-center gap-1 md:gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground rounded-full cursor-pointer">
            <Bell className="w-5 h-5" />
            <div className="absolute right-2.5 top-2.5 rounded-full border-2 border-background bg-destructive w-2.5 h-2.5"></div>
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex text-muted-foreground hover:text-foreground rounded-full cursor-pointer">

            <HelpCircle className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="hidden md:block bg-border/50 w-px h-8"></div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="hidden md:flex flex-col items-end">
                <p className="text-foreground text-sm font-bold leading-tight group-hover:text-primary transition-colors">{user?.name || "Admin User"}</p>
                <p className="text-muted-foreground text-[11px] leading-tight mt-0.5">{user?.email || "admin@lankafood.com"}</p>
              </div>
              <Avatar className="h-10 w-10 border-2 border-background shadow-sm transition-transform group-hover:scale-105">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                  {user?.name?.split(' ').map(n => n[0]).join('') || "AU"}
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[220px] rounded-xl border-border/50 bg-background/80 backdrop-blur-xl p-2 shadow-xl">
            <DropdownMenuLabel className="px-3 py-2 text-xs text-muted-foreground font-normal">Account</DropdownMenuLabel>
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors cursor-pointer">
              <User className="h-4 w-4" />
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors cursor-pointer">
              <Plus className="h-4 w-4" />
              Upgrade Plan
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuItem 
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

