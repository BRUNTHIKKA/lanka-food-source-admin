"use client";

import * as React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Package, 
  Plus, 
  Search,
  Filter,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ProductsTable } from "@/components/dashboard/ProductsTable";
import { ProductForm } from "@/components/dashboard/ProductForm";
import { productService } from "@/services/productService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, CreateProductDTO, UpdateProductDTO } from "@/types/product";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  // Fetch products
  const { data: products = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: productService.getProducts,
  });

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: productService.getCategories,
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: productService.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product created successfully");
      setIsFormOpen(false);
    },
    onError: (error: any) => {
      console.error("Create Product Error:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to create product");
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductDTO }) => 
      productService.updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product updated successfully");
      setIsFormOpen(false);
      setEditingProduct(null);
    },
    onError: (error: any) => {
      console.error("Update Product Error:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to update product");
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: productService.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete product");
    },
  });

  const handleCreate = (data: any) => {
    const payload = { 
      ...data,
      discountPrice: data.discountPrice && data.discountPrice > 0 ? data.discountPrice : null,
    };
    console.log("Creating product with payload:", payload);
    createMutation.mutate(payload);
  };

  const handleUpdate = (data: any) => {
    if (editingProduct) {
      const payload = { 
        ...data,
        discountPrice: data.discountPrice && data.discountPrice > 0 ? data.discountPrice : null,
      };
      console.log("Updating product with payload:", payload);
      updateMutation.mutate({ id: editingProduct.id, data: payload });
    }
  };

  const handleEditClick = (product: Product) => {
    if (!isAuthenticated) {
      toast.error("Please login to edit products");
      router.push("/admin/login");
      return;
    }
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteMutation.mutate(id);
    }
  };

  const filteredProducts = Array.isArray(products) 
    ? products.filter(p => {
        const name = String(p.name || "").toLowerCase();
        const category = (p.category?.name ? String(p.category.name) : "").toLowerCase();
        const query = searchQuery.toLowerCase();
        return name.includes(query) || category.includes(query);
      })
    : [];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2 sm:gap-3">
              <Package className="w-6 h-6 sm:w-8 sm:h-8 text-primary shrink-0" />
              Product Inventory
            </h1>
            <p className="text-muted-foreground mt-1 text-sm md:text-base font-manrope">
              Manage your food products, prices, and stock levels.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full md:w-auto">
            <Button 
              variant="outline" 
              className="gap-2 font-bold w-full"
              onClick={() => refetch()}
            >
              <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} /> Refresh
            </Button>
            <Button 
              className="gap-2 shadow-lg shadow-primary/20 font-bold w-full"
              onClick={() => {
                if (!isAuthenticated) {
                  toast.error("Please login to add products");
                  router.push("/admin/login");
                  return;
                }
                setEditingProduct(null);
                setIsFormOpen(true);
              }}
            >
              <Plus className="w-4 h-4" /> Add Product
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name or category..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="ghost" className="gap-2 text-muted-foreground">
            <Filter className="w-4 h-4" /> Filters
          </Button>
        </div>

        {/* Products Table */}
        <Card className="rounded-2xl overflow-hidden border-border/50 bg-card/20 backdrop-blur-md">
          <CardHeader className="border-b border-border/50 pb-6 px-6">
            <CardTitle>All Products</CardTitle>
            <CardDescription className="font-manrope">
              Showing {filteredProducts.length} products in your inventory.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ProductsTable 
              products={filteredProducts} 
              isLoading={isLoading} 
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          </CardContent>
        </Card>

        {/* Product Form Sheet */}
        <ProductForm 
          isOpen={isFormOpen}
          product={editingProduct}
          categories={categories}
          onClose={() => {
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
          onSubmit={editingProduct ? handleUpdate : handleCreate}
          isLoading={createMutation.isPending || updateMutation.isPending}
        />
      </div>
    </DashboardLayout>
  );
}
