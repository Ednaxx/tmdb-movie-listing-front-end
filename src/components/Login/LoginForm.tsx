import React from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import FormInput from "../shared/FormInput";
import LoadingButton from "../shared/LoadingButton";
import AlertMessage from "../shared/AlertMessage";

interface LoginFormProps {
  formData: {
    email: string;
    password: string;
  };
  isLoading: boolean;
  error: string | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
        label="Email"
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Enter your email"
        icon={FaEnvelope}
        required
        disabled={isLoading}
        autoComplete="email"
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
          isLoading || !formData.email.trim() || !formData.password.trim()
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
