import { Product, ProductFilters } from "../types/Product";

export interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  filters: ProductFilters;
  viewMode: "grid" | "list";
  isLoading: boolean;
  error: string | null;
}

export type ProductAction =
  | { type: "ADD_PRODUCT"; payload: Product }
  | {
      type: "UPDATE_PRODUCT";
      payload: { id: string; product: Partial<Product> };
    }
  | { type: "DELETE_PRODUCT"; payload: string }
  | { type: "SET_FILTERS"; payload: Partial<ProductFilters> }
  | { type: "SET_VIEW_MODE"; payload: "grid" | "list" }
  | { type: "APPLY_FILTERS" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

export function productReducer(
  state: ProductState,
  action: ProductAction
): ProductState {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? { ...product, ...action.payload.product }
            : product
        ),
      };

    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };

    case "SET_FILTERS":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };

    case "SET_VIEW_MODE":
      return {
        ...state,
        viewMode: action.payload,
      };

    case "APPLY_FILTERS":
      return {
        ...state,
        filteredProducts: applyFilters(state.products, state.filters),
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}

function applyFilters(products: Product[], filters: ProductFilters): Product[] {
  let filtered = [...products];

  // Apply search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.sku.toLowerCase().includes(searchLower) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  }

  // Apply category filter
  if (filters.category) {
    filtered = filtered.filter(
      (product) => product.category === filters.category
    );
  }

  // Apply status filter
  if (filters.status) {
    filtered = filtered.filter((product) => product.status === filters.status);
  }

  // Apply price range filter
  if (filters.minPrice !== null) {
    filtered = filtered.filter((product) => product.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== null) {
    filtered = filtered.filter((product) => product.price <= filters.maxPrice!);
  }

  // Apply sorting
  filtered.sort((a, b) => {
    let aValue: any = a[filters.sortBy];
    let bValue: any = b[filters.sortBy];

    if (filters.sortBy === "createdAt") {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (filters.sortOrder === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  return filtered;
}
