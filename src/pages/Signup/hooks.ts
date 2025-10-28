import { useState } from "react";
import { useUserStore } from "../../store";

export const useSignup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const signup = useUserStore((state) => state.signup);
  const isLoading = useUserStore((state) => state.isLoading);
  const error = useUserStore((state) => state.error);
  const isAuth = useUserStore((state) => state.isAuth);
  const clearError = useUserStore((state) => state.clearError);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    if (
      !formData.username.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim()
    ) {
      clearError();
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const { username, email, password } = formData;
    const result = await signup({ username, email, password });

    if (!result.success) {
      console.error("Signup failed:", result.error);
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
