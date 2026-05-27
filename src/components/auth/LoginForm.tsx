"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

import axios from "axios";

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/admin/login`,
        { email, password }
      );

      console.log("Login Response Data:", response.data);

      // Check for token in different possible locations
      const token = response.data.token || 
                    response.data.accessToken || 
                    response.data.data?.token || 
                    response.data.data?.accessToken;

      const user = response.data.user || response.data.data?.user || { email };

      if (token) {
        setAuth(user, token);
        
        // Set cookie for middleware
        document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Strict`;
        
        router.push("/dashboard");
      } else {
        console.error("Token missing in response:", response.data);
        setError("Login successful, but token not received. Please check backend response.");
      }

    } catch (err: any) {
      console.error("Detailed Login Error:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
        url: err.config?.url
      });
      setError(
        err.response?.data?.message || 
        err.response?.data?.error || 
        "Login failed. Server returned error " + (err.response?.status || "500")
      );
    } finally {

      setIsLoading(false);
    }
  };


  return (
    <div className="w-full max-w-md space-y-6 sm:space-y-8 p-5 sm:p-8 rounded-3xl bg-card/50 dark:bg-card/30 backdrop-blur-xl border border-border/50 shadow-2xl">
      <div className="space-y-2 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-black tracking-tighter text-foreground"
        >
          Welcome Back
        </motion.h1>
        <p className="text-muted-foreground font-medium">Enter your credentials to access the admin panel</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-bold text-center"
          >
            {error}
          </motion.div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="email"
                placeholder="Admin Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 bg-muted/50 border-border rounded-xl focus:ring-primary/20 transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 h-12 bg-muted/50 border-border rounded-xl focus:ring-primary/20 transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 rounded border-border bg-muted text-primary focus:ring-primary/20" />
            <span className="text-muted-foreground group-hover:text-foreground transition-colors font-medium">Remember me</span>
          </label>
          <a href="/admin/forgot-password" className="text-primary hover:underline font-bold transition-all">
            Forgot password?
          </a>
        </div>


        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-lg transition-all active:scale-[0.98] group"
        >
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>
              Sign In <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </form>

      <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border">
        Don't have an account?{" "}
        <a href="/admin/register" className="text-primary font-black hover:underline">
          Create account
        </a>
      </div>

    </div>

  );
};
