import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[radial-gradient(circle_at_top_left,#123a82_0%,#020617_45%),radial-gradient(circle_at_bottom_right,#6d28d9_0%,transparent_35%)]">

      <div className="w-full max-w-2xl">

        <div className="backdrop-blur-3xl bg-white/5 border border-white/10 shadow-2xl rounded-[32px] px-10 py-10">

          <div className="text-center mb-10">

            <p className="text-blue-400 uppercase tracking-[0.35em] text-sm font-semibold mb-4">
              TASKFLOW PRO
            </p>

            <h1 className="text-5xl font-bold text-white mb-3">
              Welcome Back
            </h1>

            <p className="text-slate-400 text-lg">
              Sign in to continue managing your projects and tasks
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-7"
          >

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-3">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-16 px-5 rounded-2xl bg-white/10 border border-white/10 text-white text-base placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-3">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-16 px-5 rounded-2xl bg-white/10 border border-white/10 text-white text-base placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-16 rounded-2xl font-semibold text-xl text-white bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 hover:scale-[1.01] transition-all duration-300 shadow-xl shadow-purple-500/30"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>

          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                Create Account
              </Link>
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;