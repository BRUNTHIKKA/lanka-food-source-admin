"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import api from "@/lib/api";

const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  adminSecret: z.string().min(1, "Admin secret is required"),
});

type UserFormValues = z.infer<typeof userSchema>;

interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function UserForm({ isOpen, onClose, onSuccess }: UserFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      adminSecret: "lanka_food_source_admin", // Default for easier admin use
    },
  });

  const { register, handleSubmit, reset, formState: { errors, isValid } } = form;

  React.useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: UserFormValues) => {
    setIsLoading(true);
    try {
      await api.post(`/auth/admin/register`, data);
      toast.success("User added successfully");
      if (onSuccess) onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Add User Error:", error);
      toast.error(error.response?.data?.message || "Failed to add user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-full sm:max-w-lg overflow-y-auto max-h-[90vh] px-4 sm:px-6 no-scrollbar">
        <DialogHeader>
          <DialogTitle>Add New Admin User</DialogTitle>
          <DialogDescription>
            Create a new administrator account for the platform.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" {...register("firstName")} placeholder="John" />
              {errors.firstName && <p className="text-xs text-destructive">{errors.firstName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" {...register("lastName")} placeholder="Doe" />
              {errors.lastName && <p className="text-xs text-destructive">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" {...register("email")} placeholder="john@example.com" />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" {...register("phone")} placeholder="+94 77 123 4567" />
            {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} placeholder="••••••••" />
            {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="adminSecret">Admin Secret Key</Label>
            <Input id="adminSecret" type="password" {...register("adminSecret")} />
            {errors.adminSecret && <p className="text-xs text-destructive">{errors.adminSecret.message}</p>}
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>Cancel</Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className={cn(
                "transition-all duration-300",
                !isValid ? "bg-primary/40 text-white/70" : "bg-primary hover:bg-primary/90"
              )}
            >
              {isLoading ? <Loader2 className="h-4 h-4 animate-spin" /> : "Add User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
