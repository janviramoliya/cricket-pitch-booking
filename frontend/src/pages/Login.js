import { FullScreenLoader } from "../components/Loading";
import FormInputField from "../components/FormInputField";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useAuth";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login: setAuth } = useAuth();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const isLoading = loginMutation.isPending;
  const onSubmit = async (data) => {
    loginMutation.mutate(data, {
      onSuccess: (res) => {
        setAuth(res.user); // { user, token }
        navigate("/"); // redirect
      },
      onError: (err) => {
        console.error(err);
        alert(err?.response?.data?.message || "Login failed");
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
            Sign in to your account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInputField
              id="email-address"
              name="email"
              type="email"
              required
              placeholder="Email address"
              register={register}
              error={errors.email}
              valueAsNumber={false}
            />
            <FormInputField
              id="password"
              name="password"
              type="password"
              required
              placeholder="Password"
              register={register}
              error={errors.password}
              valueAsNumber={false}
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full mt-2 py-2 px-4 rounded-xl text-white font-semibold transition duration-200 ${
                isLoading
                  ? "bg-emerald-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-emerald-600 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
