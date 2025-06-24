import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRouteWithRole({ children, allowedRoles }) {
  const { isLoggedin, user } = useSelector((state) => state.auth);

  if (!isLoggedin) return <Navigate to="/" />;
  if (!allowedRoles.includes(user?.role)) return <Navigate to="/unauthorized" />;

  return children;
}

export default ProtectedRouteWithRole;