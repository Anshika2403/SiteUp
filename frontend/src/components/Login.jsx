import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice';

function Login () {
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Invalid email';
    if (!formData.password) errors.password = 'Password is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      return setFormData((prev) => ({ ...prev, errors }));
    }

    dispatch(loginStart());
    try {
      const response = await axios.post('http://localhost:8080/login', {
        email: formData.email,
        password: formData.password,
      });

      const data = response.data;
      // console.log(data);

      dispatch(loginSuccess({ user: data.user, token: data.token }));
      // console.log(authState.status, authState.user , authState.token);

      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });

      // Optionally store token for session persistence
      // if (formData.rememberMe) localStorage.setItem('authToken', data.token);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      dispatch(loginFailure(errorMessage));
      console.error(errorMessage);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
        
        {authState.user ? (
          <div className="text-center text-prime space-y-4">
            <img src="https://img.icons8.com/?size=100&id=14308&format=png&color=34AF9D" alt="Success" />
            <p className="text-xl">Login Successful!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Email</label>
              <div className="relative">
                <img src="https://img.icons8.com/?size=100&id=12580&format=png&color=9cafa3" className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-3 py-2 border rounded-md"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Password</label>
              <div className="relative">
                <img src="https://img.icons8.com/?size=100&id=94&format=png&color=9cafa3" className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-3 py-2 border rounded-md"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {authState.error && <p className="text-red-500">{authState.error}</p>}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-prime rounded border-gray-300"
                />
                <label className="ml-2 text-sm text-gray-600">Remember me</label>
              </div>
              <button type="button" className="text-sm text-prime hover:text-dark">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-prime text-white py-2 px-4 rounded-md hover:bg-dark transition-colors"
            >
              Sign In
            </button>
            <h2 className='text-center text-sm text-[#131117] opacity-70'> Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-butred hover:text-dark"
              >
                Sign up
              </Link></h2>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
