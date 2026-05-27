"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Image as ImageIcon,
  Wand2,
  FolderOpen,
  Settings,
  LogOut,
  Sparkles,
  Plus,
  X,
  Users
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

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
    icon: Wand2,
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
         <div className="flex flex-col gap-4">

          <div className="flex items-center gap-3 p-2 rounded-xl group-data-[collapsible=icon]:justify-center">
             <Avatar className="h-9 w-9 border border-border shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">AD</AvatarFallback>
             </Avatar>
             <div className="flex-1 overflow-hidden group-data-[collapsible=icon]:hidden">
                <p className="text-sm font-semibold truncate leading-none text-foreground">Admin User</p>
                <p className="text-[10px] text-muted-foreground truncate mt-1">admin@lankafoodsource.com</p>
             </div>
             <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive group-data-[collapsible=icon]:hidden cursor-pointer">
                <LogOut className="w-4 h-4" />
             </Button>
          </div>
         </div>
      </SidebarFooter>
    </Sidebar>
  )
}
