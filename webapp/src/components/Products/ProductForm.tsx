import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Chip,
  Box,
  Typography,
  Card,
  CardMedia,
  IconButton,
  Stack,
  alpha,
} from "@mui/material";
import {
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import * as Yup from "yup";
import { Product, ProductFormData, Status } from "../../types/Product";
import CustomFormField from "../../common/CustomFormField";
import CustomFormSelectField from "../../common/CustomFormSelectField";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik";

interface ProductFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
  product?: Product | null;
  categories: string[];
}

export function ProductForm({
  open,
  onClose,
  onSubmit,
  product,
  categories,
}: ProductFormProps) {
  const [tagInput, setTagInput] = React.useState("");
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Product name is required")
      .min(2, "Name must be at least 2 characters"),
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters"),
    price: Yup.number()
      .required("Price is required")
      .min(0, "Price must be positive"),
    category: Yup.string().required("Category is required"),
    sku: Yup.string()
      .required("SKU is required")
      .min(3, "SKU must be at least 3 characters"),
    stock: Yup.number()
      .required("Stock is required")
      .min(0, "Stock must be non-negative")
      .integer("Stock must be a whole number"),
    status: Yup.string()
      .oneOf(["active", "inactive"])
      .required("Status is required"),
    image: Yup.string().optional(),
    tags: Yup.array().of(Yup.string()).default([]),
  });

  const formik = useFormik<ProductFormData>({
    validationSchema,
    initialValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      sku: "",
      stock: 0,
      status: Status.ACTIVE,
      image: "",
      tags: [],
    },
    onSubmit: (values) => {
      const payload: ProductFormData = { ...values };
      onSubmit(payload);
      onClose();
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        formik.setFieldValue("image", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    formik.setFieldValue("image", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !formik.values.tags.includes(trimmed)) {
      formik.setFieldValue("tags", [...formik.values.tags, trimmed]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updated = formik.values.tags.filter((tag) => tag !== tagToRemove);
    formik.setFieldValue("tags", updated);
  };

  console.log(formik);

  useEffect(() => {
    if (product) {
      formik.resetForm({
        values: {
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          sku: product.sku,
          stock: product.stock,
          status: product.status,
          image: product.image || "",
          tags: product.tags,
        },
      });
      formik.resetForm({
        values: {
          name: "",
          description: "",
          price: 0,
          category: "",
          sku: "",
          stock: 0,
          status: Status.ACTIVE,
          image: "",
          tags: [],
        },
      });
      setImagePreview(null);
    }
  }, [product]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <Dialog
      open={open}
      sx={{
        backdropFilter: "blur(5px)",
        ".MuiDialog-paper": {
          maxWidth: 550,
          maxHeight: 600,
          borderRadius: 4,
          minHeight: 400,
        },
      }}
    >
      <DialogTitle
        variant="h5"
        sx={{
          fontSize: 18,
          borderColor: "divider",
          display: "flex",
          flexDirection: "column",
          paddingY: 2.5,
        }}
      >
        {product ? "Edit Product" : "Add New Product"}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon color="inherit" />
      </IconButton>
      <DialogContent sx={{ p: 2, m: 0, paddingX: 3, height: "100%" }}>
        <Grid container spacing={4} alignItems="center">
          {/* Image Upload Section */}
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              Product Image
            </Typography>
            {imagePreview ? (
              <Card
                sx={{
                  mb: 2,
                  width: "100%",
                  boxShadow: "none",
                  border: 1,
                  borderColor: "grey.300",
                  borderRadius: 3,
                  position: "relative",
                }}
              >
                <DeleteIcon
                  color="error"
                  onClick={handleRemoveImage}
                  fontSize="large"
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                    ":hover": {
                      cursor: "pointer",
                    },
                  }}
                />
                <CardMedia
                  component="img"
                  height="200"
                  image={imagePreview}
                  alt="Product preview"
                  sx={{ objectFit: "cover" }}
                />
              </Card>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  border: "2px dashed",
                  borderColor: "grey.300",
                  borderRadius: 3,
                  p: 3,
                  textAlign: "center",
                  cursor: "pointer",
                  "&:hover": {
                    transitionDuration: "0.2s",
                    borderColor: "primary.main",
                    bgcolor: "action.hover",
                  },
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadIcon sx={{ fontSize: 48, color: "grey.400", mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Click to upload product image
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Max file size: 5MB
                </Typography>
              </Box>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </Grid>
          <CustomFormField
            name={"name"}
            label={"Product Name"}
            value={formik.values.name}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.name && formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            type={"text"}
          />
          <CustomFormField
            name={"description"}
            label={"Description"}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={Boolean(
              formik.touched.description && formik.errors.description
            )}
            helperText={formik.touched.description && formik.errors.description}
            type={"text"}
          />
          <CustomFormSelectField
            name="category"
            label="Product Category"
            itemArray={categories}
            value={formik.values.category}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.category && formik.errors.category)}
            helperText={formik.touched.category && formik.errors.category}
            type={"text"}
          />

          <CustomFormField
            name={"sku"}
            label={"SKU"}
            value={formik.values.sku}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.sku && formik.errors.sku)}
            helperText={formik.touched.sku && formik.errors.sku}
            type={"text"}
          />

          <CustomFormField
            name={"price"}
            label={"Price"}
            value={formik.values.price}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.price && formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
            type={"number"}
            startAdornment="$"
          />

          <CustomFormField
            name={"stock"}
            label={"Stock Quantity"}
            value={formik.values.stock}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.stock && formik.errors.stock)}
            helperText={formik.touched.stock && formik.errors.stock}
            type={"number"}
          />

          <CustomFormSelectField
            name="status"
            label="Status"
            itemArray={[Status.ACTIVE, Status.INACTIVE]}
            value={formik.values.status}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.status && formik.errors.status)}
            helperText={formik.touched.status && formik.errors.status}
            type={"text"}
          />

          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              Tags
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <TextField
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a tag..."
                size="small"
                sx={{ flexGrow: 1 }}
              />
              <Button onClick={handleAddTag} variant="outlined" size="small">
                Add
              </Button>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {formik.values.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                  size="small"
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ pb: 2, paddingX: 2 }}>
        <Stack flexDirection={"row"} gap={2}>
          <Button
            sx={{
              borderRadius: 2,
            }}
            onClick={onClose}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            sx={{
              borderRadius: 2,
              boxShadow: "none",
              border: 0.5,
              borderColor: "divider",
            }}
            variant="contained"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              formik.handleSubmit(e as any)
            }
            startIcon={<AddIcon fontSize="small" />}
          >
            Add
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
