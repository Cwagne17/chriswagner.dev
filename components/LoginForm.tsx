"use client";

import {
  confirmSignUp,
  resendSignUpCode,
  signIn,
  signUp,
} from "aws-amplify/auth";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface LoginFormProps {
  onAuthSuccess: () => void;
}

type AuthState = "signin" | "signup" | "confirm";

export default function LoginForm({ onAuthSuccess }: LoginFormProps) {
  const [authState, setAuthState] = useState<AuthState>("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    givenName: "",
    familyName: "",
    confirmationCode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signIn({
        username: formData.email,
        password: formData.password,
      });
      onAuthSuccess();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await signUp({
        username: formData.email,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email,
            given_name: formData.givenName,
            family_name: formData.familyName,
          },
        },
      });
      setAuthState("confirm");
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await confirmSignUp({
        username: formData.email,
        confirmationCode: formData.confirmationCode,
      });
      // Auto sign in after confirmation
      await signIn({
        username: formData.email,
        password: formData.password,
      });
      onAuthSuccess();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Confirmation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      await resendSignUpCode({ username: formData.email });
      setError("Confirmation code resent to your email");
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Failed to resend code");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-card rounded-lg p-8 border border-border shadow-lg">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold">
              {authState === "signin" && "Welcome Back"}
              {authState === "signup" && "Create Account"}
              {authState === "confirm" && "Confirm Email"}
            </h2>
            <p className="text-muted-foreground">
              {authState === "signin" && "Sign in to access the admin panel"}
              {authState === "signup" && "Create your admin account"}
              {authState === "confirm" &&
                "Enter the confirmation code sent to your email"}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 text-red-500 rounded-lg text-sm">
              {error}
            </div>
          )}

          {authState === "signin" && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="admin@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 bg-background border border-border rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setAuthState("signup")}
                  className="text-blue-500 hover:underline"
                >
                  Sign up
                </button>
              </p>
            </form>
          )}

          {authState === "signup" && (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      name="givenName"
                      value={formData.givenName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="John"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="familyName"
                    value={formData.familyName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="admin@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 bg-background border border-border rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="••••••••"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setAuthState("signin")}
                  className="text-blue-500 hover:underline"
                >
                  Sign in
                </button>
              </p>
            </form>
          )}

          {authState === "confirm" && (
            <form onSubmit={handleConfirmSignUp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Confirmation Code
                </label>
                <input
                  type="text"
                  name="confirmationCode"
                  value={formData.confirmationCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-blue-500 focus:outline-none text-center text-2xl tracking-widest"
                  placeholder="123456"
                  maxLength={6}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50"
              >
                {loading ? "Confirming..." : "Confirm Account"}
              </button>

              <p className="text-center text-sm text-muted-foreground">
                Didn&apos;t receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-blue-500 hover:underline"
                >
                  Resend code
                </button>
              </p>

              <p className="text-center text-sm text-muted-foreground">
                <button
                  type="button"
                  onClick={() => setAuthState("signin")}
                  className="text-blue-500 hover:underline"
                >
                  Back to sign in
                </button>
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
