export interface Category {
  id: string;
  name: string;
  imageUrl?: string;
  imagePublicId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number | null;
  stock: number;
  categoryId: string;
  category: Category;
  unit: string;
  imageUrl?: string;
  imagePublicId?: string;
  isAvailable: boolean;
  rating?: number;
  numReviews?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
  discountPrice?: number | null;
  stock: number;
  categoryId: string;
  unit: string;
  isAvailable: boolean;
}

export interface UpdateProductDTO {
  name?: string;
  description?: string;
  price?: number;
  discountPrice?: number | null;
  stock?: number;
  categoryId?: string;
  unit?: string;
  isAvailable?: boolean;
}
