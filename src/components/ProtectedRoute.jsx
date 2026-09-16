import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { ADMIN_EMAILS } from "../config/admins.js";

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;
  if (!user) return <Navigate to="/" />;
  if (!ADMIN_EMAILS.includes(user.email)) return <Navigate to="/" />;

  return children;
}
