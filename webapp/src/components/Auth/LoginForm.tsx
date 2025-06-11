import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Alert,
  alpha,
  Link,
  Stack,
  LinearProgress,
  IconButton,
} from "@mui/material";
import * as yup from "yup";
import { useAuth } from "../../context/AuthContext";
import CustomTextField from "../../common/CustomTextField";
import LogoImg from "../../assets/images/logo.svg";
import LoginImg from "../../assets/images/login.svg";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { useFormik } from "formik";

const validationSchema = yup.object().shape({
  email: yup.string().email().required("Please enter your email."),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(2, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export const LoginForm = ({ onSwitchToRegister }: LoginFormProps) => {
  const { state, login } = useAuth();
  const [helperText, setHelperText] = useState<string | null>(null);

  const handleChangeWithTouch = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldTouched(e.target.name, true, false);
    formik.handleChange(e);
  };

  const formik = useFormik({
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setHelperText(null);
      try {
        await login({
          email: values.email,
          password: values.password,
        });
        console.log("Successfully signed in");
      } catch (error: any) {
        setHelperText(error.toString());
        console.log(error);
      }
    },
  });

  return (
    <>
      {state.isLoading && (
        <LinearProgress
          sx={{ position: "absolute", top: 0, width: "100%", height: 3 }}
        />
      )}
      <Stack flexDirection={"row"} gap={0} sx={{ height: "100%" }}>
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            height: "100%",
            flex: 4,
            background: (theme) => alpha(theme.palette.grey[500], 0.1),
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              height: "100%",
              alignItems: "center",
            }}
            gap={8}
          >
            <img src={LoginImg} width={450} />

            <Stack gap={1.5} textAlign={"center"}>
              <Typography variant="h4" fontWeight={600}>
                Welcome back
              </Typography>
              <Typography variant="h6" color={"GrayText"}>
                Start managing your finance faster and better
              </Typography>
            </Stack>
          </Stack>
        </Box>

        <Box sx={{ flex: 4 }}>
          <Stack
            sx={{
              justifyContent: "center",
              height: "100%",
              mx: { xs: 6, md: 10 },
            }}
            gap={4}
          >
            <Stack gap={1.5} sx={{ textAlign: "center" }}>
              <Stack alignItems={"center"}>
                <img src={LogoImg} width={50} alt="Logo" />
              </Stack>
              <Typography variant="h4" fontWeight={600}>
                Welcome back
              </Typography>
              <Typography variant="h6" color={"GrayText"}>
                Start managing your finance faster and better
              </Typography>
            </Stack>
            {state.error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {state.error}
              </Alert>
            )}
            <Stack gap={2}>
              <CustomTextField
                name={"email"}
                label={"Email"}
                id={"email"}
                type={"email"}
                value={formik.values.email}
                onChange={handleChangeWithTouch}
                error={Boolean(
                  (formik.touched.email && formik.errors.email) || helperText
                )}
                helperText={formik.touched.email && formik.errors.email}
                startIcon={
                  <IconButton
                    sx={{
                      p: 1.2,
                      mb: 0.5,
                      border: "none",
                      borderRadius: 2,
                      bgcolor: (theme) => theme.palette.background.paper,
                    }}
                  >
                    <MailOutlineRoundedIcon color="primary" />
                  </IconButton>
                }
              />

              <CustomTextField
                name={"password"}
                label={"Password"}
                value={formik.values.password}
                onChange={handleChangeWithTouch}
                id={"password"}
                type={"password"}
                error={Boolean(
                  (formik.touched.password && formik.errors.password) ||
                    helperText
                )}
                helperText={formik.touched.password && formik.errors.password}
                endIcon={<VisibilityRoundedIcon color="primary" />}
              />
            </Stack>
            <Stack gap={2}>
              <Button
                variant="contained"
                sx={{ borderRadius: 2, p: 1.5 }}
                size="large"
                onClick={() => {
                  formik.submitForm();
                }}
              >
                Login
              </Button>
            </Stack>
            <Stack
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={2}
            >
              <Typography variant="h6" color={"GrayText"}>
                Don't you have an account?
                <Link
                  component="button"
                  type="button"
                  onClick={onSwitchToRegister}
                  sx={{
                    textDecoration: "none",
                    textAlign: "end",
                    fontWeight: 600,
                    color: "primary.main",
                  }}
                >
                  Sign up
                </Link>
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </>
  );
};
