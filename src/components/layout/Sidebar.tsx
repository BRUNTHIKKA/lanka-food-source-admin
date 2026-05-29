"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Image as ImageIcon,
  ShoppingBag,
  FolderOpen,
  Settings,
  LogOut,
  Sparkles,
  Plus,
  X,
  Users,
  ChevronsUpDown,
  User
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
  {
    title: "Products",
    url: "/products",
    icon: ImageIcon,
  },
  {
    title: "Orders",
    url: "/orders",
    icon: ShoppingBag,
  },
  {
    title: "Reviews",
    url: "/reviews",
    icon: FolderOpen,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const { isMobile, setOpenMobile } = useSidebar()
  const pathname = usePathname()
  const { user, logout, isAuthenticated } = useAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    console.log("Logging out...");
    logout();
    window.location.href = "/admin/login";
  };

  if (!isAuthenticated || !user) {
    return (
      <Sidebar collapsible="icon" className="border-r border-border/50 bg-card/50 backdrop-blur-xl">
        <SidebarHeader className="h-20 flex items-center justify-center px-4">
           {/* ... Header content ... */}
           <div className="flex items-center gap-3 w-full group-data-[collapsible=icon]:justify-center transition-all duration-300">
             <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 shrink-0">
               <Sparkles className="w-6 h-6" />
             </div>
             <span className="font-bold text-xl tracking-tight group-data-[collapsible=icon]:hidden">LankaFoodSource</span>
           </div>
        </SidebarHeader>
        <SidebarContent className="px-3 group-data-[collapsible=icon]:px-1 transition-all">
          <SidebarGroup className="group-data-[collapsible=icon]:p-0">
            <SidebarGroupContent>
              <SidebarMenu className="gap-1.5 group-data-[collapsible=icon]:items-center">
                <SidebarMenuItem className="w-full">
                  <SidebarMenuButton asChild className="h-11 w-full px-3 transition-all group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center">
                    <a href="/admin/login" className="flex items-center gap-3 w-full group-data-[collapsible=icon]:justify-center">
                      <LogOut className="h-5 w-5 shrink-0" />
                      <span className="text-sm font-medium group-data-[collapsible=icon]:hidden">Login</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    )
  }

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50 bg-card/50 backdrop-blur-xl">
      <SidebarHeader className="h-20 flex items-center justify-center px-4">
        <div className="flex items-center gap-3 w-full group-data-[collapsible=icon]:justify-center transition-all duration-300">
           <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight group-data-[collapsible=icon]:hidden">LankaFoodSource</span>
        </div>

        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 right-4 h-8 w-8 rounded-full hover:bg-muted/50 transition-colors z-50"
            onClick={() => setOpenMobile(false)}
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </Button>
        )}
      </SidebarHeader>
      
      <SidebarContent className="px-3 group-data-[collapsible=icon]:px-1 transition-all">
        <SidebarGroup className="group-data-[collapsible=icon]:p-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5 group-data-[collapsible=icon]:items-center">
              {items.map((item) => {
                const isActive = pathname === item.url || pathname?.startsWith(item.url + "/")
                
                return (
                  <SidebarMenuItem key={item.title} className="w-full">
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={isActive}
                      className={`h-11 w-full px-3 transition-all group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center ${
                        isActive 
                          ? "bg-primary/10 text-primary font-bold shadow-sm" 
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      }`}
                    >
                      <a href={item.url} className="flex items-center gap-3 w-full group-data-[collapsible=icon]:justify-center">
                        <item.icon className={`h-5 w-5 shrink-0 ${isActive ? "text-primary" : ""}`} />
                        <span className="text-sm font-medium group-data-[collapsible=icon]:hidden">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 group-data-[collapsible=icon]:px-1 transition-all">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-14 border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-muted/50 transition-all rounded-xl"
                >
                  <Avatar className="h-9 w-9 border border-border shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                      {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'AD'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden overflow-hidden">
                    <span className="truncate font-semibold">{user?.name || 'Admin User'}</span>
                    <span className="truncate text-xs text-muted-foreground">{user?.email || 'admin@lankafoodsource.com'}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden text-muted-foreground" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl bg-card border-border/50 backdrop-blur-xl"
                side="top"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 border border-border">
                      <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
                        {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'AD'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight overflow-hidden">
                      <span className="truncate font-semibold">{user?.name || 'Admin User'}</span>
                      <span className="truncate text-xs text-muted-foreground">{user?.email || 'admin@lankafoodsource.com'}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem className="gap-2 cursor-pointer focus:bg-muted/50" onClick={() => router.push("/admin/profile")}>
                  <User className="size-4" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 cursor-pointer focus:bg-muted/50" onClick={() => router.push("/settings")}>
                  <Settings className="size-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem 
                  className="gap-2 cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive" 
                  onClick={handleLogout}
                >
                  <LogOut className="size-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
