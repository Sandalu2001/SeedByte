import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Box,
  Chip,
  Typography,
  Paper,
  useTheme,
  alpha,
  Stack,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  AttachMoney as MoneyIcon,
} from "@mui/icons-material";
import { Product } from "../../types/Product";
import { format } from "date-fns";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export function ProductList({ products, onEdit, onDelete }: ProductListProps) {
  const theme = useTheme();

  const getStockColor = (stock: number) => {
    if (stock === 0) return "error";
    if (stock < 10) return "warning";
    return "success";
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 3,
        background: (theme) => alpha(theme.palette.primary.main, 0.1),
        px: 2,
      }}
    >
      <List>
        {products.map((product, index) => (
          <ListItem
            key={product.id}
            sx={{
              borderBottom:
                index < products.length - 1
                  ? `1px solid ${theme.palette.divider}`
                  : "none",
            }}
            secondaryAction={
              <Stack sx={{ flexDirection: "column", gap: 1 }}>
                <IconButton
                  edge="end"
                  onClick={() => onEdit(product)}
                  sx={{
                    color: "primary.main",
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    border: 1,
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => onDelete(product.id)}
                  sx={{
                    borderRadius: 2,

                    color: "error.main",
                    bgcolor: alpha(theme.palette.error.main, 0.1),
                    border: 1,
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            }
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  backgroundColor: "primary.main",
                  width: 90,
                  height: 90,
                  mr: 3,
                }}
              >
                {product.name.charAt(0).toUpperCase()}
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}
                >
                  <Typography variant="h6">{product.name}</Typography>
                  <Chip
                    label={product.status}
                    color={product.status === "active" ? "success" : "default"}
                    size="small"
                  />
                  <Chip
                    label={product.category}
                    variant="outlined"
                    size="small"
                  />
                </Box>
              }
              secondary={
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {product.description}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      flexWrap: "wrap",
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <Typography
                        variant="h6"
                        color="success.main"
                        fontWeight="600"
                      >
                        ${product.price.toFixed(2)}
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      color={`${getStockColor(product.stock)}.main`}
                    >
                      Stock: {product.stock}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      SKU: {product.sku}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Updated:{" "}
                      {format(new Date(product.updatedAt), "MMM dd, yyyy")}
                    </Typography>
                  </Box>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
