import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Alert,
  Link,
  Stack,
  alpha,
  IconButton,
  LinearProgress,
} from "@mui/material";
import * as yup from "yup";
import { useAuth } from "../../context/AuthContext";
import CustomTextField from "../../common/CustomTextField";
import { useFormik } from "formik";
import Logo from "../../assets/images/logo.svg";
import RegisterImg from "../../assets/images/sign_up.svg";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup.string().email().required("Please enter your email."),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(2, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  confirmPassword: yup.string().required("Please confirm your password"),
});

export const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const { state, register } = useAuth();
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
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      setHelperText(null);
      try {
        await register({
          name: values.name,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
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
            <img src={RegisterImg} width={450} />
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
                <img src={Logo} width={50} alt="Logo" />
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
                name={"name"}
                label={"Name"}
                id={"name"}
                type={"text"}
                value={formik.values.name}
                onChange={handleChangeWithTouch}
                error={Boolean(
                  (formik.touched.name && formik.errors.name) || helperText
                )}
                helperText={formik.touched.name && formik.errors.name}
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
              <CustomTextField
                name={"confirmPassword"}
                label={"Confirm Password"}
                value={formik.values.confirmPassword}
                onChange={handleChangeWithTouch}
                id={"confirmPassword"}
                type={"password"}
                error={Boolean(
                  (formik.touched.confirmPassword &&
                    formik.errors.confirmPassword) ||
                    helperText
                )}
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
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
                Sign up
              </Button>
            </Stack>

            <Typography
              variant="h6"
              color={"GrayText"}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Already have an account?
              <Link
                component="button"
                type="button"
                onClick={onSwitchToLogin}
                sx={{
                  textDecoration: "none",
                  textAlign: "center",
                  fontWeight: 600,
                  ml: 1,
                  color: "primary.main",
                }}
              >
                Login
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </>
  );
};
