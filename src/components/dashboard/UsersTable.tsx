"use client";

import * as React from "react";
import { 
  MoreHorizontal,
  Mail,
  Phone
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  joined: string;
  initials: string;
}

const recentUsers: User[] = [
  { 
    id: 1, 
    name: "Alex Johnson", 
    email: "alex.j@example.com", 
    phone: "+1 234 567 890", 
    status: "Active", 
    joined: "2 hours ago",
    initials: "AJ"
  },
  { 
    id: 2, 
    name: "Sarah Miller", 
    email: "s.miller@user.com", 
    phone: "+1 987 654 321", 
    status: "Pending", 
    joined: "5 hours ago",
    initials: "SM"
  },
  { 
    id: 3, 
    name: "Michael Chen", 
    email: "m.chen@design.io", 
    phone: "+86 123 4567 89", 
    status: "Active", 
    joined: "1 day ago",
    initials: "MC"
  },
  { 
    id: 4, 
    name: "Emily White", 
    email: "emily.w@gallery.net", 
    phone: "+44 20 1234 5678", 
    status: "Active", 
    joined: "2 days ago",
    initials: "EW"
  },
];

export function UsersTable({ limit }: { limit?: number }) {
  const displayUsers = limit ? recentUsers.slice(0, limit) : recentUsers;

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border/50">
            <TableHead className="pl-6 h-12">User Information</TableHead>
            <TableHead className="h-12 hidden md:table-cell">Contact</TableHead>
            <TableHead className="h-12">Account Status</TableHead>
            <TableHead className="h-12 hidden sm:table-cell">Joined</TableHead>
            <TableHead className="text-right pr-6 h-12">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayUsers.map((user) => (
            <TableRow key={user.id} className="group transition-colors border-border/50 hover:bg-muted/30">
              <TableCell className="pl-6 py-5">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10 border border-border shadow-sm group-hover:scale-105 transition-transform duration-300">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-foreground">{user.name}</span>
                    <span className="text-[11px] text-muted-foreground mt-0.5">ID: {user.id}092{user.id}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-5 hidden md:table-cell">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors cursor-default">
                    <Mail className="w-3.5 h-3.5" /> {user.email}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors cursor-default">
                    <Phone className="w-3.5 h-3.5" /> {user.phone}
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-5">
                <Badge 
                  variant="secondary" 
                  className={cn(
                    "font-bold text-[10px] border-none px-2.5 py-0.5 rounded-full select-none",
                    user.status === "Active" 
                      ? "bg-green-500/10 text-green-500" 
                      : "bg-amber-500/10 text-amber-500"
                  )}
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground text-xs font-medium py-5 hidden sm:table-cell">
                {user.joined}
              </TableCell>
              <TableCell className="text-right pr-6 py-5">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-secondary/80 cursor-pointer transition-colors shadow-none hover:text-primary">
                      <MoreHorizontal className="w-4.5 h-4.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 rounded-xl border-border/50 p-1.5 shadow-xl">
                    <DropdownMenuItem className="cursor-pointer rounded-lg text-sm transition-colors py-2 px-3">View Full Profile</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer rounded-lg text-sm transition-colors py-2 px-3">Edit Details</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer rounded-lg text-sm transition-colors py-2 px-3">Transaction History</DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-border/50 my-1" />
                    <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer rounded-lg text-sm transition-colors py-2 px-3 font-medium">
                      Suspend Account
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
