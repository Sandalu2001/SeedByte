import { alpha, IconButton, Paper, Stack, Typography } from "@mui/material";
import React from "react";

export interface DataCardProps {
  title: string;
  icon?: React.ReactNode;
  value: string | number;
  color: "primary" | "secondary" | "success" | "error" | "warning";
}
const DataCard = ({ title, icon, value, color }: DataCardProps) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 1,
        display: "flex",
        alignItems: "center",
        gap: 2,
        borderRadius: 3,
        borderColor:
          color === "primary"
            ? "primary.main"
            : color === "secondary"
            ? "secondary.main"
            : color === "success"
            ? "success.main"
            : color === "error"
            ? "error.main"
            : "warning.main",
        backgroundColor:
          color === "primary"
            ? (theme) => alpha(theme.palette.primary.main, 0.1)
            : color === "secondary"
            ? (theme) => alpha(theme.palette.secondary.main, 0.1)
            : color === "success"
            ? (theme) => alpha(theme.palette.success.main, 0.1)
            : color === "error"
            ? (theme) => alpha(theme.palette.error.main, 0.1)
            : (theme) => alpha(theme.palette.warning.main, 0.1),
      }}
    >
      {icon && <IconButton sx={{ color: `${color}.main` }}>{icon}</IconButton>}
      <Stack
        textAlign={"center"}
        justifyContent={"center"}
        justifyItems={"center"}
        alignContent={"center"}
        alignItems={"center"}
        flexDirection={"row"}
        gap={2}
      >
        <Typography variant="body1" color={`${color}.main`}>
          {title}
        </Typography>
        <Typography variant="body1" color={`${color}.main`}>
          {value}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default DataCard;
