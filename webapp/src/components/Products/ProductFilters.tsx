import React from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  alpha,
  Stack,
  InputAdornment,
} from "@mui/material";
import { Clear as ClearIcon, Search } from "@mui/icons-material";
import { ProductFilters } from "../../types/Product";

interface ProductFiltersProps {
  filters: ProductFilters;
  onFiltersChange: (filters: Partial<ProductFilters>) => void;
  categories: string[];
}

export function ProductFiltersComponent({
  filters,
  onFiltersChange,
  categories,
}: ProductFiltersProps) {
  const hasActiveFilters = Boolean(
    filters.search ||
      filters.category ||
      filters.status ||
      filters.minPrice ||
      filters.maxPrice
  );

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      category: "",
      status: "",
      minPrice: null,
      maxPrice: null,
    });
  };

  return (
    <Stack gap={3}>
      {/* Search - Always visible */}
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        gap={hasActiveFilters ? 3 : 0}
      >
        <TextField
          fullWidth
          label="Search products..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ search: e.target.value })}
          sx={{
            "& legend": { display: "none" },
            "& .MuiInputLabel-root": {
              display: "none",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              p: 0,
              background: (theme) => alpha(theme.palette.grey[500], 0.1),
            },
          }}
          InputProps={{
            sx: {
              borderRadius: 3,
            },
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {hasActiveFilters && (
            <Button
              size="small"
              onClick={clearFilters}
              startIcon={<ClearIcon />}
              sx={{ minWidth: 100 }}
            >
              Clear All
            </Button>
          )}
        </Box>
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              sx={{
                borderRadius: 2,
              }}
              size="small"
              value={filters.category}
              label="Category"
              onChange={(e) => onFiltersChange({ category: e.target.value })}
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              sx={{
                borderRadius: 2,
                "& .MuiInputLabel-root": {
                  display: "none",
                },
                borderSize: 2,
              }}
              size="small"
              value={filters.status}
              label="Status"
              onChange={(e) => onFiltersChange({ status: e.target.value })}
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            type="number"
            label="Min Price"
            size="small"
            value={filters.minPrice || ""}
            onChange={(e) =>
              onFiltersChange({
                minPrice: e.target.value ? Number(e.target.value) : null,
              })
            }
            sx={{
              borderSize: 2,
            }}
            InputProps={{
              sx: { borderRadius: 2 },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            type="number"
            label="Max Price"
            size="small"
            value={filters.maxPrice || ""}
            onChange={(e) =>
              onFiltersChange({
                maxPrice: e.target.value ? Number(e.target.value) : null,
              })
            }
            sx={{
              borderSize: 2,
            }}
            InputProps={{
              sx: { borderRadius: 2 },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={filters.sortBy}
              label="Sort By"
              onChange={(e) =>
                onFiltersChange({ sortBy: e.target.value as any })
              }
              sx={{
                borderRadius: 2,
                "& .MuiInputLabel-root": {
                  display: "none",
                },
                borderSize: 2,
              }}
              size="small"
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="stock">Stock</MenuItem>
              <MenuItem value="createdAt">Date Created</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>Order</InputLabel>
            <Select
              value={filters.sortOrder}
              label="Order"
              onChange={(e) =>
                onFiltersChange({
                  sortOrder: e.target.value as "asc" | "desc",
                })
              }
              sx={{
                borderRadius: 2,
                "& .MuiInputLabel-root": {
                  display: "none",
                },
                borderSize: 2,
              }}
              size="small"
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Stack>
  );
}
