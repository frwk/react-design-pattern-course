import { AlertColor } from "@mui/material/Alert";

export default interface CustomSnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity: AlertColor;
}