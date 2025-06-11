import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Avatar,
  Tooltip,
  useTheme,
  CardMedia,
  Stack,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Inventory as InventoryIcon,
  AttachMoney as MoneyIcon,
  Image as ImageIcon,
} from "@mui/icons-material";
import { Product } from "../../types/Product";
import { format } from "date-fns";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  const theme = useTheme();

  const getStockColor = (stock: number) => {
    if (stock === 0) return "error";
    if (stock < 10) return "warning";
    return "success";
  };

  const getStockText = (stock: number) => {
    if (stock === 0) return "Out of Stock";
    if (stock < 10) return "Low Stock";
    return "In Stock";
  };

  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "visible",
        borderRadius: 3,
        p: 1,
      }}
    >
      <Box sx={{ position: "absolute", top: 20, right: 20, zIndex: 1 }}>
        <Chip
          label={product.status}
          variant="filled"
          color={product.status === "active" ? "success" : "error"}
          size="small"
          sx={{ textTransform: "capitalize" }}
        />
      </Box>

      {product.image ? (
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.name}
          sx={{ objectFit: "cover", borderRadius: 3 }}
        />
      ) : (
        <Box
          sx={{
            height: 200,
            background: `linear-gradient(135deg, ${theme.palette.primary.light}20, ${theme.palette.secondary.light}20)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            borderRadius: 3,
          }}
        >
          <Avatar
            sx={{
              width: 64,
              height: 64,
              backgroundColor: "primary.main",
              fontSize: "1.5rem",
            }}
          >
            {product.image ? (
              <ImageIcon />
            ) : (
              product.name.charAt(0).toUpperCase()
            )}
          </Avatar>
        </Box>
      )}

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-between"
          alignContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="h6" gutterBottom noWrap>
            {product.name}
          </Typography>
          <Chip
            label={product.category}
            variant="outlined"
            size="small"
            sx={{ mb: 1 }}
          />
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.description}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-between"
          alignContent={"center"}
          alignItems={"center"}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <MoneyIcon sx={{ fontSize: 16, color: "success.main" }} />
            <Typography variant="h6" color="success.main">
              {product.price.toFixed(2)}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <InventoryIcon
              sx={{ fontSize: 16, color: getStockColor(product.stock) }}
            />
            <Typography
              variant="body2"
              color={`${getStockColor(product.stock)}.main`}
            >
              {getStockText(product.stock)} ({product.stock})
            </Typography>
          </Box>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{ mt: 1 }}
          justifyContent="space-between"
          alignContent={"center"}
          alignItems={"center"}
        >
          <Stack>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              SKU: {product.sku}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              Updated: {format(new Date(product.updatedAt), "MMM dd, yyyy")}
            </Typography>
          </Stack>
          <Stack flexDirection={"row"} gap={2}>
            <Tooltip title="Edit Product">
              <IconButton
                size="small"
                onClick={() => onEdit(product)}
                sx={{ color: "primary.main" }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Product">
              <IconButton
                size="small"
                onClick={() => onDelete(product.id)}
                sx={{ color: "error.main" }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
