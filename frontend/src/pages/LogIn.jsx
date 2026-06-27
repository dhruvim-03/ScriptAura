import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

const LogIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.username || formData.username.trim().length < 3) {
      setError("Username must be at least 3 characters long.");
      return false;
    }

    if (!formData.password || formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const response = await api.post(
        "/api/v1/sign-in",
        formData
      );

      if (response.status === 200) {
        setSuccess("Login successful! Redirecting...");

        // Save credentials to localStorage
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);

        // Update Redux state
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));

        setFormData({
          username: "",
          password: "",
        });

        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Invalid credentials or server is offline.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (

  <div
    className="min-h-screen bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage:
        "url('https://i.pinimg.com/736x/29/92/21/2992219d4320b4d6be1d47a498cd8cc8.jpg')",
    }}
  >
    <div className="min-h-screen bg-black/20 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl border border-white/50 p-8">
        {/* Header */}
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-[#6B4F3A]">
        Welcome Back
      </h2>

      <p className="text-gray-600 mt-2 text-sm">
        Sign in to your bookstore account.
      </p>
    </div>

    {/* Error Message */}
    {error && (
      <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
        {error}
      </div>
    )}

    {/* Success Message */}
    {success && (
      <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
        {success}
      </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Username */}
      <div>
        <label className="block text-sm font-medium text-[#6B4F3A] mb-2">
          Username
        </label>

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          disabled={loading}
          placeholder="Enter your username"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A8F6A]"
          required
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-[#6B4F3A] mb-2">
          Password
        </label>

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          disabled={loading}
          placeholder="Enter your password"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A8F6A]"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-[#7A8F6A] hover:bg-[#5E7151] text-white rounded-xl font-medium transition duration-300 disabled:opacity-70"
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>
    </form>

    {/* Footer */}
    <div className="mt-6 text-center border-t pt-5">
      <p className="text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/SignUp"
          className="text-[#7A8F6A] font-semibold hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>

  </div>
</div>
  </div>
);

};

export default LogIn;
