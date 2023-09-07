import { toast } from "react-toastify";

const toastOptions = {
  position: "bottom-left",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const handleSucess = (message) => {
  toast.success(message, toastOptions);
};

export const handleError = (err) => {
  toast.warn(err?.message || "Ocurrio un error", toastOptions);
};

export const ValidEmail = (email) => {
    const valid = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (valid.test(email)) {
      return true;
    } else {
      handleError("Email no válido");
    }
  };
