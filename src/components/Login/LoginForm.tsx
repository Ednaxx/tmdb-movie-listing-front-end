import React from "react";
import { FaUser, FaLock } from "react-icons/fa";
import FormInput from "../shared/FormInput";
import LoadingButton from "../shared/LoadingButton";
import AlertMessage from "../shared/AlertMessage";

interface LoginFormProps {
  formData: {
    username: string;
    password: string;
  };
  isLoading: boolean;
  error: string | null;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginForm = ({
  formData,
  isLoading,
  error,
  handleInputChange,
  handleSubmit,
}: LoginFormProps) => {
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && <AlertMessage type="error" message={error} />}

      <FormInput
        label="Username"
        id="username"
        name="username"
        type="text"
        value={formData.username}
        onChange={handleInputChange}
        placeholder="Enter your username"
        icon={FaUser}
        required
        disabled={isLoading}
        autoComplete="username"
      />

      <FormInput
        label="Password"
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Enter your password"
        icon={FaLock}
        required
        disabled={isLoading}
        autoComplete="current-password"
      />

      <LoadingButton
        type="submit"
        disabled={
          isLoading || !formData.username.trim() || !formData.password.trim()
        }
        isLoading={isLoading}
        loadingText="Signing in..."
        className="w-full"
      >
        Sign In
      </LoadingButton>
    </form>
  );
};

export default LoginForm;
