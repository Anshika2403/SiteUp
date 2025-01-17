import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../store/authSlice";
import { Link } from "react-router-dom";
import axios from "axios";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      return setFormData((prev) => ({ ...prev, errors }));
    }

    dispatch(loginStart());
    try {
      const response = await axios.post("http://localhost:8080/register", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Sign-up failed");

      dispatch(loginSuccess({ user: data.user, token: data.token }));

      // Optionally store token for session persistence
      // localStorage.setItem("authToken", data.token);
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        {loading ? (
          <p className="text-center text-gray-500">Creating account...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 border rounded-md"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded-md"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2 border rounded-md"
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full p-2 border rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-prime text-white py-2 px-4 rounded-md hover:bg-dark transition-colors"
            disabled={loading}
          >
            Sign Up
          </button>
          <h2 className="text-center text-sm text-[#131117] opacity-70">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-butred hover:text-dark"
            >
              Sign in
            </Link>
          </h2>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
