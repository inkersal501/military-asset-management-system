import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLoggedin } = useSelector((state) => state.auth);
  return isLoggedin ? children : <Navigate to="/" />;
};

export default ProtectedRoute;