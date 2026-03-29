import React from "react";
import FormInputField from "../components/FormInputField";
import { FullScreenLoader } from "../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRegister } from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const isLoading = registerMutation.isPending;

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      return alert("Passwords do not match");
    }

    registerMutation.mutate(data, {
      onSuccess: () => {
        navigate("/login");
      },
      onError: (err) => {
        alert(err?.response?.data?.message || "Register failed");
      },
    });
  };

  return (
    <div
      className={`relative ${isLoading ? "max-h-screen overflow-hidden" : ""}`}
    >
      {isLoading && <FullScreenLoader />}
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-center text-2xl font-bold text-emerald-600 mb-6">
            Create your account
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <FormInputField
              id="name"
              name="name"
              type="text"
              placeholder="Full Name"
              register={register}
              error={errors.name}
            />
            <FormInputField
              id="email-address"
              name="email"
              type="email"
              placeholder="Email address"
              register={register}
              error={errors.email}
            />
            <FormInputField
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              register={register}
              error={errors.password}
            />
            <FormInputField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              register={register}
            />
            <button
              type="submit"
              className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200 shadow-md"
            >
              Sign up
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-600 hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
