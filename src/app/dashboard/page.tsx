"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Users,
  Image as ImageIcon,
  Zap,
  ArrowUpRight,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { UsersTable } from "@/components/dashboard/UsersTable";
import { UserForm } from "@/components/dashboard/UserForm";
import * as React from "react";
import { toast } from "sonner";

const stats = [
  { name: "Total Users", value: "342", icon: Users, color: "text-purple-500", bg: "bg-purple-500/10", trend: "+12%" },
  { name: "Total Images", value: "24,512", icon: ImageIcon, color: "text-blue-500", bg: "bg-blue-500/10", trend: "+8%" },
  { name: "AI Generations", value: "8,942", icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10", trend: "+18%" },
];

export default function DashboardPage() {
  const [isUserFormOpen, setIsUserFormOpen] = React.useState(false);

  const downloadReport = () => {
    // Simple CSV export implementation
    const headers = ["ID", "Name", "Email", "Phone", "Status", "Joined"];
    const rows = [
      ["1", "Alex Johnson", "alex.j@example.com", "+1 234 567 890", "Active", "2 hours ago"],
      ["2", "Sarah Miller", "s.miller@user.com", "+1 987 654 321", "Pending", "5 hours ago"],
      ["3", "Michael Chen", "m.chen@design.io", "+86 123 4567 89", "Active", "1 day ago"],
      ["4", "Emily White", "emily.w@gallery.net", "+44 20 1234 5678", "Active", "2 days ago"],
    ];

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `admin_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Admin report downloaded successfully!");
  };
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Admin Overview</h1>
            <p className="text-muted-foreground mt-1 text-sm md:text-base font-manrope">Managing users and AI generation metrics across the platform.</p>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full md:w-auto">
            <Button 
              variant="outline" 
              className="gap-2 font-bold w-full cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={downloadReport}
            >
              Download Report <ArrowUpRight className="w-4 h-4" />
            </Button>
            <Button 
              className="gap-2 shadow-lg shadow-primary/20 font-bold w-full cursor-pointer"
              onClick={() => setIsUserFormOpen(true)}
            >
              <Plus className="w-4 h-4" /> Add User
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {stats.map((stat) => (
            <Card key={stat.name} className="hover:border-primary/50 transition-all group cursor-default bg-card/40 border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-bold text-muted-foreground">{stat.name}</CardTitle>
                <div className={cn("p-2.5 rounded-xl", stat.bg)}>
                  <stat.icon className={cn("w-5 h-5", stat.color)} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black tracking-tight">{stat.value}</div>
                <p className="text-xs text-green-500 mt-1 font-bold">
                  {stat.trend} <span className="text-muted-foreground font-normal">from last month</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity Section */}
        <Card className="rounded-2xl overflow-hidden border-border/50 bg-card/20 backdrop-blur-md">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-6 px-6">
            <div>
              <CardTitle className="text-xl font-bold">Recent User Signups</CardTitle>
              <CardDescription className="font-manrope">A summary of the latest accounts registered on the platform.</CardDescription>
            </div>
            <a href="/users">
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5 w-fit font-black cursor-pointer">
                View All Users
              </Button>
            </a>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="w-full whitespace-nowrap">
              <UsersTable limit={4} />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardContent>
        </Card>
        
        <UserForm 
          isOpen={isUserFormOpen} 
          onClose={() => setIsUserFormOpen(false)}
          onSuccess={() => {
            // Optional: refresh user table if needed
          }}
        />
      </div>
    </DashboardLayout>
  );
}
