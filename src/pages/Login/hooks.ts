import { useState } from "react";
import { useUserStore } from "../../store";

export const useLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const authenticate = useUserStore((state) => state.authenticate);
  const isLoading = useUserStore((state) => state.isLoading);
  const error = useUserStore((state) => state.error);
  const isAuth = useUserStore((state) => state.isAuth);
  const clearError = useUserStore((state) => state.clearError);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.password.trim()) {
      return;
    }

    const result = await authenticate(formData);

    if (!result.success) {
      console.error("Login failed:", result.error);
    }
  };

  return {
    formData,
    isLoading,
    error,
    isAuth,
    handleInputChange,
    handleSubmit,
  };
};
