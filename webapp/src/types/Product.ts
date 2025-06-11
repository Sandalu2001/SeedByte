export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sku: string;
  stock: number;
  status: Status;
  image?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFilters {
  search: string;
  category: string;
  status: string;
  minPrice: number | null;
  maxPrice: number | null;
  sortBy: "name" | "price" | "createdAt" | "stock";
  sortOrder: "asc" | "desc";
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  sku: string;
  stock: number;
  status: Status;
  image?: string;
  tags: string[];
}

export enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
}
