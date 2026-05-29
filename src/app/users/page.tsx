"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Users, 
  Plus,
  Search,
  Filter,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { UsersTable } from "@/components/dashboard/UsersTable";
import * as React from "react";
import api from "@/lib/api";

export default function UsersPage() {
  const [totalUsers, setTotalUsers] = React.useState<number>(0);

  React.useEffect(() => {
    const fetchTotal = async () => {
      try {
        const response = await api.get("/admin/stats");
        // The endpoint returns an array of stats, "Total Users" is at index 0 or we can find it
        const userStat = response.data.data.find((s: any) => s.name === "Total Users");
        if (userStat) {
          setTotalUsers(parseInt(userStat.value));
        }
      } catch (error) {
        console.error("Fetch stats error:", error);
      }
    };
    fetchTotal();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Manage Users</h1>
            <p className="text-muted-foreground mt-1 text-sm md:text-base font-manrope">Directory of all registered users and their platform status.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2 h-11 px-5 cursor-pointer font-bold border-border/50">
              <Download className="w-4 h-4" /> Export CSV
            </Button>
            <Button className="gap-2 h-11 px-5 cursor-pointer shadow-lg shadow-primary/20 font-bold uppercase transition-all hover:scale-105 active:scale-95">
              <Plus className="w-4 h-4" /> Add New User
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search users by name, email, or WhatsApp..." 
              className="pl-10 h-11 bg-card/30 border-border/50 rounded-xl focus-visible:ring-1 focus-visible:ring-primary/20"
            />
          </div>
          <Button variant="outline" className="gap-2 h-11 px-5 border-border/50 font-bold cursor-pointer">
            <Filter className="w-4 h-4" /> Filters
          </Button>
        </div>

        {/* Main Content Table */}
        <Card className="rounded-2xl overflow-hidden border-border/50 bg-card/20 backdrop-blur-md shadow-2xl">
          <CardHeader className="border-b border-border/50 bg-muted/20 px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold">All Registered Users</CardTitle>
                <CardDescription className="font-manrope">Showing all users registered on the platform.</CardDescription>
              </div>
              <div className="text-xs font-bold text-muted-foreground bg-muted px-3 py-1.5 rounded-full border border-border/50 italic">
                Total: {totalUsers}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="w-full whitespace-nowrap">
              <UsersTable />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
