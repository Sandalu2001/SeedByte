import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  alpha,
  Stack,
  Paper,
} from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";
import TodayIcon from "@mui/icons-material/Today";
import { useProducts } from "../../context/ProductContext";
import { useAuth } from "../../context/AuthContext";
import LogoImg from "../../assets/images/logo.svg";

export function Header() {
  const { state } = useProducts();
  const { state: authState, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const lowStockCount = state.products.filter(
    (product) => product.stock < 10
  ).length;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        display: "flex",
        justifyContent: "center",
        boxShadow: "none",
        bgcolor: "transparent",
      }}
    >
      <Toolbar sx={{ py: 3 }}>
        <Stack flexDirection={"row"} flexGrow={1} alignItems={"center"} gap={1}>
          <Stack alignItems={"center"}>
            <img src={LogoImg} width={50} alt="Logo" />
          </Stack>
          <Typography variant="h4" color={"black"} fontWeight={"700"}>
            SeedByte Product Management
          </Typography>
        </Stack>
        <Stack sx={{ flexDirection: "row", gap: 2 }}>
          <Paper
            variant="outlined"
            sx={{
              borderRadius: 10,
              p: 1,
              display: "flex",
              flexDirection: "row",
              gap: 3,
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {new Date().toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}{" "}
            <IconButton
              sx={{
                p: 0.5,
                border: "none",
                borderRadius: 2,
                bgcolor: (theme) => theme.palette.primary.light,
                "&:hover": {
                  bgcolor: (theme) => theme.palette.primary.main,
                },
              }}
            >
              <TodayIcon color="info" />
            </IconButton>
          </Paper>

          <Paper
            variant="outlined"
            sx={{
              borderRadius: 30,
              p: 0.4,
              pr: 2,
              display: "flex",
              flexDirection: "row",
              gap: 1,
              cursor: "pointer",
            }}
            onClick={handleMenuOpen}
          >
            <Avatar
              sx={{
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.8),
                width: 50,
                height: 50,
              }}
            >
              {authState.user?.name.charAt(0).toUpperCase()}
            </Avatar>
            <Stack justifyContent={"center"}>
              <Typography variant="body2" color={"GrayText"}>
                Cashier
              </Typography>
              <Typography variant="body1" fontWeight={"600"}>
                {authState.user?.name}
              </Typography>
            </Stack>
          </Paper>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
