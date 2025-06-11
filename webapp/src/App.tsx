import React from "react";
import { Box } from "@mui/material";
import { Header } from "./components/Layout/Header";
import { ProductsPage } from "./components/Products/ProductsPage";
import { AuthScreen } from "./components/Auth/AuthScreen";
import { useAuth } from "./context/AuthContext";

function App() {
  const { state } = useAuth();

  if (!state.isAuthenticated) {
    return (
      <Box
        sx={{
          height: "100vh",
          backgroundColor: "background.default",
        }}
      >
        <AuthScreen />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        mx: 5,
        my: 2,
      }}
    >
      <Header />
      <ProductsPage />
    </Box>
  );
}

export default App;
