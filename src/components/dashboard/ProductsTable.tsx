"use client";

import * as React from "react";
import { 
  MoreHorizontal,
  Package,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle
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
import { Product } from "@/types/product";

interface ProductsTableProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export function ProductsTable({ products, isLoading, onEdit, onDelete }: ProductsTableProps) {
  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Loading products...</div>;
  }

  if (products.length === 0) {
    return <div className="p-8 text-center text-muted-foreground">No products found.</div>;
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border/50">
            <TableHead className="pl-6 h-12">Product Details</TableHead>
            <TableHead className="h-12 hidden md:table-cell">Category & Unit</TableHead>
            <TableHead className="h-12">Price</TableHead>
            <TableHead className="h-12 hidden sm:table-cell">Stock</TableHead>
            <TableHead className="h-12">Status</TableHead>
            <TableHead className="text-right pr-6 h-12">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="group transition-colors border-border/50 hover:bg-muted/30">
              <TableCell className="pl-3 sm:pl-6 py-5">
                <div className="flex items-center gap-2 sm:gap-4">
                  {product.imageUrl ? (
                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-primary/20 shadow-sm hidden sm:flex">
                      <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20 shadow-sm hidden sm:flex">
                      <Package className="w-5 h-5" />
                    </div>
                  )}
                  <div className="flex flex-col max-w-[140px] sm:max-w-[200px]">
                    <span className="font-semibold text-xs sm:text-sm text-foreground truncate">{product.name}</span>
                    <span className="text-[10px] sm:text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{product.description}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-5 hidden md:table-cell">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-foreground">
                    {product.category?.name || "Uncategorized"}
                  </span>
                  <span className="text-[10px] text-muted-foreground">Unit: {product.unit}</span>
                </div>
              </TableCell>
              <TableCell className="py-5">
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-foreground">Rs. {(product.price || 0).toFixed(2)}</span>
                  {typeof product.discountPrice === 'number' && product.discountPrice > 0 && (
                    <span className="text-[10px] text-muted-foreground line-through">
                      Rs. {product.discountPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell className="py-5 text-sm font-medium hidden sm:table-cell">
                <span className={cn(
                  product.stock < 10 ? "text-amber-500 font-bold" : "text-foreground"
                )}>
                  {product.stock}
                </span>
              </TableCell>
              <TableCell className="py-5">
                <Badge 
                  variant="secondary" 
                  className={cn(
                    "font-bold text-[10px] border-none px-2.5 py-0.5 rounded-full select-none",
                    product.isAvailable
                      ? "bg-green-500/10 text-green-500" 
                      : "bg-destructive/10 text-destructive"
                  )}
                >
                  {product.isAvailable ? (
                    <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Available</span>
                  ) : (
                    <span className="flex items-center gap-1"><XCircle className="w-3 h-3" /> Unavailable</span>
                  )}
                </Badge>
              </TableCell>
              <TableCell className="text-right pr-6 py-5">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-secondary/80 cursor-pointer transition-colors shadow-none hover:text-primary">
                      <MoreHorizontal className="w-4.5 h-4.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 rounded-xl border-border/50 p-1.5 shadow-xl">
                    <DropdownMenuItem 
                      className="cursor-pointer rounded-lg text-sm transition-colors py-2 px-3 gap-2"
                      onClick={() => onEdit(product)}
                    >
                      <Pencil className="w-4 h-4 text-muted-foreground" /> Edit Product
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-border/50 my-1" />
                    <DropdownMenuItem 
                      className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer rounded-lg text-sm transition-colors py-2 px-3 font-medium gap-2"
                      onClick={() => onDelete(product.id)}
                    >
                      <Trash2 className="w-4 h-4" /> Delete Product
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
