"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Loader2, ArrowRight, Phone, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    adminSecret: "lanka_food_source_admin"
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await api.post(
        `/auth/admin/register`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          adminSecret: formData.adminSecret
        }
      );
      
      router.push("/admin/login");
    } catch (err: any) {
      console.error("Registration Error Details:", err.response?.data);
      const serverMessage = err.response?.data?.message || err.response?.data?.error;
      const validationErrors = err.response?.data?.errors;
      
      if (validationErrors && typeof validationErrors === 'object') {
        const firstError = Object.values(validationErrors)[0];
        setError(String(firstError));
      } else {
        setError(serverMessage || "Registration failed. Please check your inputs.");
      }
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
          Create Admin
        </motion.h1>
        <p className="text-muted-foreground font-medium">Join our network of food source providers</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                name="firstName"
                placeholder="First Name"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="pl-10 h-12 bg-muted/50 border-border rounded-xl font-medium"
              />
            </div>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                name="lastName"
                placeholder="Last Name"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="pl-10 h-12 bg-muted/50 border-border rounded-xl font-medium"
              />
            </div>
          </div>

          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              name="email"
              type="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
              className="pl-10 h-12 bg-muted/50 border-border rounded-xl font-medium"
            />
          </div>

          <div className="relative group">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              name="phone"
              placeholder="Phone Number"
              required
              value={formData.phone}
              onChange={handleChange}
              className="pl-10 h-12 bg-muted/50 border-border rounded-xl font-medium"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              name="password"
              type="password"
              placeholder="Create Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="pl-10 h-12 bg-muted/50 border-border rounded-xl font-medium"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="pl-10 h-12 bg-muted/50 border-border rounded-xl font-medium"
            />
          </div>

          <div className="relative group">
            <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              name="adminSecret"
              placeholder="Admin Secret Key"
              required
              value={formData.adminSecret}
              onChange={handleChange}
              className="pl-10 h-12 bg-muted/50 border-border rounded-xl font-medium"
            />
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-lg transition-all active:scale-[0.98] group mt-6"
        >
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>
              Register Now <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </form>

      <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border">
        Already have an account?{" "}
        <a href="/admin/login" className="text-primary font-black hover:underline">
          Sign In
        </a>
      </div>
    </div>

  );
};
