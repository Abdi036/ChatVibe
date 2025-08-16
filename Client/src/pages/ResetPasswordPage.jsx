import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, Lock, ShieldCheck } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

function ResetPasswordPage() {
  const { token } = useParams();
  const [newPassword, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await resetPassword(token, newPassword);
    setLoading(false);
    navigate("/login");
  };

  return (
    <div className="h-screen grid lg:grid-cols-1">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
              >
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Reset Password</h1>
              <p className="text-base-content/60">
                Enter your new newPassword below
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">New Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="newPassword"
                  className="input w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
