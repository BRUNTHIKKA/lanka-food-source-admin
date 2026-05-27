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

export default function UsersPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary mb-2">
              <Users className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">Management</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase">Manage Users</h1>
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
                <CardTitle className="text-lg font-bold uppercase tracking-wide">All Registered Users</CardTitle>
                <CardDescription className="text-xs font-manrope">Showing all users registered on the platform.</CardDescription>
              </div>
              <div className="text-xs font-bold text-muted-foreground bg-muted px-3 py-1.5 rounded-full border border-border/50 italic">
                Total: 342
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
