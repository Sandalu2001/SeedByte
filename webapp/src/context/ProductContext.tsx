import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { Product, ProductFilters } from "../types/Product";
import {
  productReducer,
  ProductState,
  ProductAction,
} from "../reducers/productReducer";
import { loadFromStorage, saveToStorage } from "../utils/localStorage";

interface ProductContextType {
  state: ProductState;
  dispatch: React.Dispatch<ProductAction>;
  addProduct: (
    product: Omit<Product, "id" | "createdAt" | "updatedAt">
  ) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  setFilters: (filters: Partial<ProductFilters>) => void;
  exportProducts: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const initialFilters: ProductFilters = {
  search: "",
  category: "",
  status: "",
  minPrice: null,
  maxPrice: null,
  sortBy: "createdAt",
  sortOrder: "desc",
};

const initialState: ProductState = {
  products: loadFromStorage("products", []),
  filteredProducts: [],
  filters: initialFilters,
  viewMode: "grid",
  isLoading: false,
  error: null,
};

export function ProductProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    saveToStorage("products", state.products);
  }, [state.products]);

  useEffect(() => {
    dispatch({ type: "APPLY_FILTERS" });
  }, [state.products, state.filters]);

  const addProduct = (
    productData: Omit<Product, "id" | "createdAt" | "updatedAt">
  ) => {
    const newProduct: Product = {
      ...productData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    dispatch({ type: "ADD_PRODUCT", payload: newProduct });
  };

  const updateProduct = (id: string, productData: Partial<Product>) => {
    const updatedProduct = {
      ...productData,
      updatedAt: new Date(),
    };
    dispatch({
      type: "UPDATE_PRODUCT",
      payload: { id, product: updatedProduct },
    });
  };

  const deleteProduct = (id: string) => {
    dispatch({ type: "DELETE_PRODUCT", payload: id });
  };

  const setFilters = (filters: Partial<ProductFilters>) => {
    dispatch({ type: "SET_FILTERS", payload: filters });
  };

  const exportProducts = () => {
    const dataStr = JSON.stringify(state.filteredProducts, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `products-${
      new Date().toISOString().split("T")[0]
    }.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const value: ProductContextType = {
    state,
    dispatch,
    addProduct,
    updateProduct,
    deleteProduct,
    setFilters,
    exportProducts,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
