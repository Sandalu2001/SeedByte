import { SelectChangeEvent } from "@mui/material";
import { ReactNode } from "react";

export interface CustomFormFieldProps {
  name: string;
  label: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: React.ReactNode;
  type: React.HTMLInputTypeAttribute | undefined;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
}

export interface CustomFormSelectFieldProps {
  name: string;
  label: string;
  value: string | number;
  onChange: (
    event: SelectChangeEvent<string | number>,
    child: ReactNode
  ) => void;
  error?: boolean;
  helperText?: React.ReactNode;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  type: React.HTMLInputTypeAttribute | undefined;
  itemArray: string[];
}

export interface AddToCartPopperProps {
  anchorEl: HTMLElement | null;
  handleClick: (event: React.MouseEvent<HTMLElement> | null) => void;
}

export interface BasicInfoPopperProps {
  anchorEl: HTMLElement | null;
}

export interface UserInfoPopperProps {
  anchorEl: HTMLElement | null;
  handleClick: (event: React.MouseEvent<HTMLElement> | null) => void;
}

export interface AddToCartModalProps {
  open: boolean;
  handleClose: () => void;
}

export interface CustomTextFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: React.ReactNode;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  id: string;
  type: React.HTMLInputTypeAttribute | undefined;
}

export enum AuthState {
  ACTIVE = "active",
  LOGOUT = "logout",
  LOADING = "loading",
}
