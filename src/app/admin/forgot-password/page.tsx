"use client";

import React, { useState } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowLeft, Loader2, CheckCircle2, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSent(true);
      } else {
        setError(data.error || "Failed to send email. Please check your Resend configuration.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <AuthLayout>
      <div className="w-full max-w-md p-8 rounded-3xl bg-card/30 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          {!isSent ? (
            <motion.div
              key="forgot"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              <div className="space-y-2 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-3xl font-black tracking-tighter text-foreground">Forgot Password?</h1>
                <p className="text-muted-foreground font-medium">No worries, we'll send you recovery instructions.</p>
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
                
                <div className="relative group">

                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    type="email"
                    placeholder="Enter admin email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl font-medium"
                  />
                </div>

                <Button 
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl bg-primary text-white font-black text-lg shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                >
                  {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Reset Password"}
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8 text-center"
            >
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-black tracking-tighter text-foreground">Email Sent!</h2>
                <p className="text-muted-foreground font-medium leading-relaxed">
                  We've sent a password reset link to <br/>
                  <span className="text-foreground font-bold">{email}</span>
                </p>
              </div>
              
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-muted-foreground">
                Didn't receive the email? Check your spam folder or <button onClick={() => setIsSent(false)} className="text-primary font-bold hover:underline">try again</button>
              </div>

              <a href="/admin/login">
                <Button variant="ghost" className="w-full h-12 text-muted-foreground hover:text-foreground font-bold">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
                </Button>
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {!isSent && (
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <a href="/admin/login" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary font-bold transition-all">
              <ArrowLeft className="w-4 h-4" /> Back to Login
            </a>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
