
import React, { useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa"; // Social login icons
// import { MdShoppingCart } from "react-icons/md"; // Shopping cart icon
import MdShoppingCart from "../../assets/images/undraw_empty_cart_co35__1_-removebg-preview.png"
import SignupPage from "../Login/SignupPage"
import { Link,useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();  // Hook for navigation

  // Dummy login data
  const dummyEmail = "b2y@admin.com";
  const dummyPassword = "b2y123";

  const handleLogin = () => {
    if (email === dummyEmail && password === dummyPassword) {
      console.log("Logged in with:", email, password);
      // Redirect to another page or show success message
      setError("");
      // You can use React Router's useNavigate to redirect
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-[#E5F7FA] to-[#1CA9C9]">
      {/* Left Section with Gradient Background and Refined Cross-Line */}
      <div className="w-full md:w-1/2 bg-gradient-to-r from-[#E5F7FA] to-[#1CA9C9] flex justify-center items-center p-12 relative">
        <div className="w-full max-w-lg bg-white z-20 p-8 rounded-3xl shadow-xl">
          <h2 className="text-4xl font-semibold text-center text-[#168F8F] mb-6">Login In</h2>

          {/* Email Input */}
          <input
            type="email"
            className="w-full p-4 mb-4 border border-[#168F8F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1CA9C9] transition-all duration-300 ease-in-out"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Input */}
          <div className="relative mb-6">
            <input
              type="password"
              className="w-full p-4 border border-[#168F8F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1CA9C9] transition-all duration-300 ease-in-out"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="absolute top-3 right-3 text-[#168F8F]">
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {/* Forgot Password Link */}
          <div className="text-center mb-6">
            <a href="#!" className="text-sm text-[#1CA9C9] hover:underline transition duration-300">Forgot password?</a>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full py-4 bg-[#1CA9C9] text-white font-semibold rounded-lg mb-6 hover:bg-[#168F8F] transition-all duration-300 ease-in-out"
          >
            Login In
          </button>

          {/* Social Login Buttons */}
          <div className="flex justify-center gap-4 mb-6">
            <button className="p-3 bg-white border border-[#168F8F] rounded-full text-red-500 hover:bg-red-100 transition-all duration-300 ease-in-out">
              <FaGoogle size={24} />
            </button>
            <button className="p-3 bg-white border border-[#168F8F] rounded-full text-blue-600 hover:bg-blue-100 transition-all duration-300 ease-in-out">
              <FaFacebook size={24} />
            </button>
          </div>

          {/* Sign up Link */}
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/SignupPage" className="text-[#1CA9C9] hover:underline transition duration-300">
              Sign up
            </Link>
          </p>
        </div>

        {/* Diagonal Cross-Line with Soft Effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-[#168F8F] opacity-10 transform rotate-45 origin-top-left"></div>
      </div>

      {/* Right Section with Clean Green Background */}
      <div className="w-1/2 bg-[#1CA9C9] flex justify-center items-center">
        <img src={MdShoppingCart} alt="Your Image" className="w-[700px] h-[700px] object-contain" />
      </div>
    </div>
  );
};

export default LoginPage;

