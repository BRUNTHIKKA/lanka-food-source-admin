"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuthStore } from "@/store/authStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Mail, Shield, Calendar, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <p className="text-muted-foreground">Please login to view your profile.</p>
          <Button onClick={() => router.push("/admin/login")}>Login</Button>
        </div>
      </DashboardLayout>
    );
  }

  const handleLogout = () => {
    logout();
    window.location.href = "/admin/login";
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-700">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">My Profile</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base font-manrope">
            View and manage your account details.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <Card className="col-span-1 border-border/50 bg-card/20 backdrop-blur-md">
            <CardContent className="pt-8 flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 border-2 border-primary/20">
                <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                  {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'AD'}
                </AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-xl font-bold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.role || 'Administrator'}</p>
              
              <div className="w-full mt-6 space-y-2">
                <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard")}>
                  Dashboard
                </Button>
                <Button variant="ghost" className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Details Card */}
          <Card className="col-span-1 md:col-span-2 border-border/50 bg-card/20 backdrop-blur-md">
            <CardHeader className="border-b border-border/50">
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Official details associated with your admin account.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <User className="w-4 h-4" /> Full Name
                  </div>
                  <p className="font-semibold text-lg">{user.name}</p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Mail className="w-4 h-4" /> Email Address
                  </div>
                  <p className="font-semibold text-lg">{user.email}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Shield className="w-4 h-4" /> Access Level
                  </div>
                  <p className="font-semibold text-lg">{user.role || 'Super Admin'}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Calendar className="w-4 h-4" /> Member Since
                  </div>
                  <p className="font-semibold text-lg">May 2026</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
