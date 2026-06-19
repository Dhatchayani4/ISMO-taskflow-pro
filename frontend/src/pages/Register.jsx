import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration successful!");
      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[radial-gradient(circle_at_top_left,#0f3b8c_0%,#020617_40%),radial-gradient(circle_at_bottom_right,#7c3aed_0%,transparent_35%)]">

      <div className="w-full max-w-lg">

        <div className="backdrop-blur-3xl bg-white/5 border border-white/10 rounded-[32px] p-10 shadow-2xl">

          <div className="text-center mb-10">

            <h2 className="text-blue-400 text-sm tracking-[0.35em] uppercase font-semibold mb-4">
              TASKFLOW PRO
            </h2>

            <h1 className="text-5xl font-bold text-white mb-3">
              Create Account
            </h1>

            <p className="text-slate-400">
              Start managing projects smarter.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block text-slate-300 mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-14 px-5 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 px-5 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 px-5 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-2xl font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 hover:scale-[1.02] transition-all"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-400">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-blue-400 font-semibold"
              >
                Sign In
              </Link>
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;