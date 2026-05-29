"use client";

import * as React from "react";
import { 
  MoreHorizontal,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import api from "@/lib/api";
import { toast } from "sonner";
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

export interface Order {
  id: string;
  orderNumber: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  shippingAddress: string;
  phone: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export function OrdersTable({ limit }: { limit?: number }) {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders");
      setOrders(response.data.data);
    } catch (error: any) {
      console.error("Fetch orders error:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId: string, status: string) => {
    try {
      await api.patch(`/orders/${orderId}/status`, { status });
      toast.success(`Order status updated to ${status}`);
      fetchOrders();
    } catch (error: any) {
      toast.error("Failed to update status");
    }
  };

  const displayOrders = limit ? orders.slice(0, limit) : orders;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING": return <Clock className="w-3 h-3" />;
      case "CONFIRMED": return <CheckCircle2 className="w-3 h-3" />;
      case "SHIPPED": return <Truck className="w-3 h-3" />;
      case "DELIVERED": return <CheckCircle2 className="w-3 h-3" />;
      case "CANCELLED": return <XCircle className="w-3 h-3" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING": return "bg-amber-500/10 text-amber-500";
      case "CONFIRMED": return "bg-blue-500/10 text-blue-500";
      case "SHIPPED": return "bg-purple-500/10 text-purple-500";
      case "DELIVERED": return "bg-green-500/10 text-green-500";
      case "CANCELLED": return "bg-red-500/10 text-red-500";
      default: return "";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        No orders found.
      </div>
    );
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border/50">
            <TableHead className="pl-6 h-12">Order Details</TableHead>
            <TableHead className="h-12 hidden md:table-cell">Customer</TableHead>
            <TableHead className="h-12">Amount</TableHead>
            <TableHead className="h-12">Status</TableHead>
            <TableHead className="h-12 hidden sm:table-cell">Date</TableHead>
            <TableHead className="text-right pr-6 h-12">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayOrders.map((order) => (
            <TableRow key={order.id} className="group transition-colors border-border/50 hover:bg-muted/30">
              <TableCell className="pl-6 py-5">
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-sm text-foreground">{order.orderNumber}</span>
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <CreditCard className="w-3 h-3" /> {order.paymentMethod.replace(/_/g, ' ')}
                  </span>
                </div>
              </TableCell>
              <TableCell className="py-5 hidden md:table-cell">
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">{order.user.firstName} {order.user.lastName}</span>
                  <span className="text-[11px] text-muted-foreground">{order.phone}</span>
                </div>
              </TableCell>
              <TableCell className="py-5">
                <span className="font-black text-sm text-primary">LKR {order.totalAmount.toLocaleString()}</span>
              </TableCell>
              <TableCell className="py-5">
                <Badge 
                  variant="secondary" 
                  className={cn(
                    "font-bold text-[10px] border-none px-2.5 py-1 rounded-full flex items-center gap-1 w-fit",
                    getStatusColor(order.status)
                  )}
                >
                  {getStatusIcon(order.status)}
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground text-xs font-medium py-5 hidden sm:table-cell">
                {new Date(order.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right pr-6 py-5">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-secondary/80 cursor-pointer transition-colors">
                      <MoreHorizontal className="w-4.5 h-4.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 rounded-xl border-border/50 p-1.5 shadow-xl">
                    <DropdownMenuItem className="cursor-pointer rounded-lg text-sm py-2 px-3" onClick={() => updateStatus(order.id, "CONFIRMED")}>Mark Confirmed</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer rounded-lg text-sm py-2 px-3" onClick={() => updateStatus(order.id, "SHIPPED")}>Mark Shipped</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer rounded-lg text-sm py-2 px-3" onClick={() => updateStatus(order.id, "DELIVERED")}>Mark Delivered</DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-border/50 my-1" />
                    <DropdownMenuItem className="text-destructive cursor-pointer rounded-lg text-sm py-2 px-3" onClick={() => updateStatus(order.id, "CANCELLED")}>Cancel Order</DropdownMenuItem>
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
