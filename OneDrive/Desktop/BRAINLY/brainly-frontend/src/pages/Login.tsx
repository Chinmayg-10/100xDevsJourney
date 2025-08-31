import React, { useEffect, useState } from "react";
import "../index.css";
import axios from "axios"; // ✅ fix import
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { EmailIcon } from "../icons/Email";
import { LockIcon } from "../icons/Lock";
import { CrossIcon } from "../icons/Cross";
import { backendUrl } from "../config";
import { useNavigate } from "react-router-dom";
import { ProfileIcon } from "../icons/Profile";

export function Login() {
  const [state, SetState] = useState("Login");
  const [username, Setusername] = useState("");
  const [password, Setpassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const [loading, Setloading] = useState(false);
  const [error, setError] = useState("");
  const navigate=useNavigate();
  function Togglepassword() {
    setshowPassword((c) => !c);
  }

  // block scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    Setloading(true);
    setError("");

    try {
      const endpoint =
        state === "Login"
          ? `${backendUrl}/api/v1/signin`
          : `${backendUrl}/api/v1/signup`;

      const res = await axios.post(
        endpoint,
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (state === "Login") {
        localStorage.setItem("token", res.data.token);
        alert("Logged in successfully!");
      } else {
        alert("Account created successfully!");
        SetState("Login");
      }
      navigate('/dashboard');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Something went wrong");
      } else {
        setError(err.message);
      }
    } finally {
      Setloading(false);
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white relative p-10 rounded-xl text-slate-500"
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium mb-2">
          {state}
        </h1>
        <p className="text-sm text-blue-900 mb-9 ">
          {state === "Login"
            ? "Welcome back! Please sign in to continue"
            : "Create your account to get started"}
        </p>

        {/* Username */}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-3 ">
            <ProfileIcon/>
          <input
            onChange={(e) => Setusername(e.target.value)}
            value={username}
            type="text"
            placeholder="Username"
            required
            className="outline-none text-sm"
          />
        </div>

        {/* Password */}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-3">
          <LockIcon />
          <div className="relative w-full">
            <input
              onChange={(e) => Setpassword(e.target.value)}
              value={password}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="outline-none text-sm w-full"
            />
            <button
              type="button"
              onClick={Togglepassword}
              className="absolute right-1 top-1/2 -translate-y-1/2 text-lg"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {state === "Login" && (
          <h3 className="text-sm mt-5 text-blue-500 cursor-pointer">
            Forgot password?
          </h3>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-full py-2 mt-4 cursor-pointer disabled:opacity-50"
          disabled={loading || username.trim() === "" || password.trim() === ""}
        >
          {loading
            ? "Loading..."
            : state === "Login"
            ? "Login"
            : "Create Account"}
        </button>

        {state === "Login" ? (
          <p
            className="text-sm mt-4 text-center"
            onClick={() => SetState("Sign up")}
          >
            Don&apos;t have an account?
            <span className="text-blue-500 underline cursor-pointer">
              {" "}
              Sign up
            </span>
          </p>
        ) : (
          <p
            className="text-sm mt-2 text-center"
            onClick={() => SetState("Login")}
          >
            Already have an account?
            <span className="text-blue-500 underline cursor-pointer">
              {" "}
              Login
            </span>
          </p>
        )}

        <button
          type="button"
          className="absolute top-4 right-4 text-slate-500 hover:text-black"
          aria-label="Close"
        >
          <CrossIcon />
        </button>
      </motion.form>
    </div>
  );
}

