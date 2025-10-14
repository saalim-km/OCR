import { toast } from "sonner";

export const useAppToast = () => {
  const success = (message: string) => {
    toast.success(message, { duration: 3000 });
  };

  const error = (message: string) => {
    toast.error(message, { duration: 3000 });
  };

  const info = (message: string) => {
    toast(message, { duration: 3000 });
  };

  return { success, error, info };
};
