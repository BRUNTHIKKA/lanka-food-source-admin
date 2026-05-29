"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Product, Category } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Loader2, X, UploadCloud, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// ─── Image Upload via local Next.js API route ─────────────────────────────────
async function uploadImageViaRoute(file: File): Promise<{ url: string; publicId: string }> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error || "Upload failed");
  }

  const data = await res.json();
  return { 
    url: data.url, 
    publicId: data.publicId 
  };
}
// ─────────────────────────────────────────────────────────────────────────────

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be positive"),
  discountPrice: z.number().min(0).optional().nullable(),
  stock: z.number().min(0, "Stock must be positive"),
  categoryId: z.string().min(1, "Category is required"),
  unit: z.string().min(1, "Unit is required"),
  imageUrl: z.string().optional().nullable(),
  imagePublicId: z.string().optional().nullable(),
  isAvailable: z.boolean(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  product?: Product | null;
  categories: Category[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormValues) => void;
  isLoading: boolean;
}

export function ProductForm({ product, categories, isOpen, onClose, onSubmit, isLoading }: ProductFormProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      discountPrice: 0,
      stock: 0,
      categoryId: "",
      unit: "kg",
      imageUrl: "",
      imagePublicId: "",
      isAvailable: true,
    },
  });

  const { register, handleSubmit, reset, setValue, getValues, formState: { errors, isValid } } = form;

  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [isHovering, setIsHovering] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadSuccess, setUploadSuccess] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Upload file to Cloudinary and set values in form
  const handleFileUpload = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image too large. Please select an image under 5MB.");
      return;
    }

    const localUrl = URL.createObjectURL(file);
    setImagePreview(localUrl);
    setUploadSuccess(false);

    setIsUploading(true);
    try {
      const { url, publicId } = await uploadImageViaRoute(file);
      setValue("imageUrl", url, { shouldValidate: true, shouldDirty: true });
      setValue("imagePublicId", publicId, { shouldValidate: true, shouldDirty: true });
      setImagePreview(url);
      setUploadSuccess(true);
      toast.success("Image uploaded successfully!");
    } catch (err: any) {
      console.error("Image upload error:", err);
      toast.error(err.message || "Failed to upload image.");
      setImagePreview(product?.imageUrl || null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setUploadSuccess(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setValue("imageUrl", "");
    setValue("imagePublicId", "");
  };

  React.useEffect(() => {
    if (isOpen) {
      if (product) {
        reset({
          name: product.name,
          description: product.description,
          price: product.price,
          discountPrice: product.discountPrice || 0,
          stock: product.stock,
          categoryId: product.categoryId,
          unit: product.unit,
          imageUrl: product.imageUrl || "",
          imagePublicId: product.imagePublicId || "",
          isAvailable: product.isAvailable,
        });
        setImagePreview(product.imageUrl || null);
      } else {
        reset({
          name: "",
          description: "",
          price: 0,
          discountPrice: 0,
          stock: 0,
          categoryId: "",
          unit: "kg",
          imageUrl: "",
          imagePublicId: "",
          isAvailable: true,
        });
        setImagePreview(null);
      }
      setUploadSuccess(false);
    }
  }, [product, reset, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-full sm:max-w-xl overflow-y-auto max-h-[90vh] px-4 sm:px-6 no-scrollbar">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Create New Product"}</DialogTitle>
          <DialogDescription>
            {product 
              ? "Update product details and image." 
              : "Add a new product to your inventory."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit((data) => {
          // We use getValues() to ensure we have the absolute latest programmatic values (imageUrl, etc.)
          const finalData = { ...data, ...getValues() };
          console.log("FINAL Form Data to be sent:", finalData);
          onSubmit(finalData);
        })} className="space-y-6 py-4">
          
          <input type="hidden" {...register("imageUrl")} />
          <input type="hidden" {...register("imagePublicId")} />

          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} />
            {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
          </div>

          {/* Image Upload Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Product Image</Label>
              {isUploading && <span className="text-xs animate-pulse">Uploading...</span>}
              {uploadSuccess && !isUploading && <span className="text-xs text-green-500">Ready</span>}
            </div>
            <div 
              className={cn(
                "relative h-40 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden",
                imagePreview ? "border-primary/50" : "border-muted-foreground/20 hover:border-primary/50",
                isUploading && "opacity-50 pointer-events-none"
              )}
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <>
                  <img src={imagePreview} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button type="button" size="icon" variant="secondary" className="h-7 w-7 rounded-full" onClick={(e) => { e.stopPropagation(); removeImage(); }}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center p-4">
                  <UploadCloud className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="text-sm mt-2">Upload Image</p>
                </div>
              )}
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" step="0.01" {...register("price", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="discountPrice">Discount Price</Label>
              <Input id="discountPrice" type="number" step="0.01" {...register("discountPrice", { valueAsNumber: true })} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" type="number" {...register("stock", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Input id="unit" {...register("unit")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoryId">Category</Label>
            <select id="categoryId" {...register("categoryId")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="">Select Category</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="isAvailable" {...register("isAvailable")} className="h-4 w-4" />
            <Label htmlFor="isAvailable">Available</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading || isUploading}>Cancel</Button>
            <Button 
              type="submit" 
              disabled={isLoading || isUploading}
              className={cn(
                "transition-all duration-300",
                !isValid ? "bg-primary/40 text-white/70" : "bg-primary hover:bg-primary/90"
              )}
            >
              {(isLoading || isUploading) ? "Saving..." : (product ? "Update Product" : "Create Product")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
