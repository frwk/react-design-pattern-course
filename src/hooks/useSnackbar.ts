import { useState } from "react";
import { AlertColor } from "@mui/material/Alert";

const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('success');

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = ({ message, severity }: { message: string, severity: AlertColor }) => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
  }

  return {
    open,
    message,
    severity,
    handleClose,
    handleOpen,
  };
};

export default useSnackbar;
