import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Alert,
  Paper,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import {
  Add as AddIcon,
  ViewModule as GridViewIcon,
  ViewList as ListViewIcon,
  GetApp as ExportIcon,
} from "@mui/icons-material";
import { useProducts } from "../../context/ProductContext";
import { ProductCard } from "./ProductCard";
import { ProductList } from "./ProductList";
import { ProductForm } from "./ProductForm";
import { ProductFiltersComponent } from "./ProductFilters";
import { Product } from "../../types/Product";
import DataCard from "../../common/DataCard";

const ITEMS_PER_PAGE = 12;

const CATEGORIES = [
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Sports",
  "Books",
  "Toys",
  "Beauty",
  "Automotive",
  "Food & Beverage",
  "Health",
];

export function ProductsPage() {
  const {
    state,
    addProduct,
    updateProduct,
    deleteProduct,
    setFilters,
    exportProducts,
    dispatch,
  } = useProducts();
  const [formOpen, setFormOpen] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(
    null
  );
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleOpenForm = (product?: Product) => {
    setEditingProduct(product || null);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = (data: any) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, data);
    } else {
      addProduct(data);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  const toggleViewMode = () => {
    dispatch({
      type: "SET_VIEW_MODE",
      payload: state.viewMode === "grid" ? "list" : "grid",
    });
  };

  // Pagination
  const totalPages = Math.ceil(state.filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = state.filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  React.useEffect(() => {
    setCurrentPage(1);
  }, [state.filters]);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Products
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Export Products">
            <IconButton onClick={exportProducts} sx={{ color: "primary.main" }}>
              <ExportIcon />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={`Switch to ${
              state.viewMode === "grid" ? "List" : "Grid"
            } View`}
          >
            <IconButton onClick={toggleViewMode} sx={{ color: "primary.main" }}>
              {state.viewMode === "grid" ? <ListViewIcon /> : <GridViewIcon />}
            </IconButton>
          </Tooltip>

          <Button
            sx={{
              borderRadius: 2,
              boxShadow: "none",
              border: 0.5,
              borderColor: "divider",
            }}
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenForm()}
          >
            Add Product
          </Button>
        </Box>
      </Box>

      {/* Stats */}
      <Stack
        sx={{
          gap: 4,
          alignItems: "center",
          flexDirection: "row",
          alignContent: "space-between",
          justifyContent: "space-between",
          my: 4,
        }}
      >
        <DataCard
          title={"Total Products"}
          value={state.products.length}
          color={"primary"}
        />
        <DataCard
          title={"Active Products"}
          value={state.products.filter((p) => p.status === "active").length}
          color={"success"}
        />
        <DataCard
          title={"Low Stock"}
          value={state.products.filter((p) => p.stock < 10).length}
          color={"error"}
        />
        <DataCard
          title={"Filtered Results"}
          value={state.filteredProducts.length}
          color={"secondary"}
        />
        <DataCard
          title={"Total Categories"}
          value={CATEGORIES.length}
          color={"warning"}
        />
      </Stack>

      {/* Filters */}
      <ProductFiltersComponent
        filters={state.filters}
        onFiltersChange={setFilters}
        categories={CATEGORIES}
      />

      {/* Empty State */}
      {state.filteredProducts.length === 0 && (
        <Alert
          severity="info"
          sx={{ mb: 3 }}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => handleOpenForm()}
            >
              Add Product
            </Button>
          }
        >
          {state.products.length === 0
            ? "No products found. Start by adding your first product!"
            : "No products match your current filters. Try adjusting your search criteria."}
        </Alert>
      )}

      {/* Products Display */}
      {paginatedProducts.length > 0 && (
        <>
          {state.viewMode === "grid" ? (
            <Grid container spacing={3}>
              {paginatedProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <ProductCard
                    product={product}
                    onEdit={handleOpenForm}
                    onDelete={handleDelete}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <ProductList
              products={paginatedProducts}
              onEdit={handleOpenForm}
              onDelete={handleDelete}
            />
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, page) => setCurrentPage(page)}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}

      {/* Product Form */}
      <ProductForm
        open={formOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        product={editingProduct}
        categories={CATEGORIES}
      />
    </Box>
  );
}
