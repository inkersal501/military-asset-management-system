import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Purchases from "./pages/Purchases";
import Transfers from "./pages/Transfers";
import Assignments from "./pages/Assignments";
import Navbar from "./components/Navbar";

import ProtectedRouteWithRole from "./routes/ProtectedRouteWithRole";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./routes/ProtectedRoute";
import "./App.css";
import Register from "./pages/Register";

function App() {
  
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);

  return (
    <Router>
      {isLoggedin && <Navbar />}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={isLoggedin ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />

        <Route path="/purchases" element={
          <ProtectedRouteWithRole allowedRoles={["admin", "logistics"]}>
            <Purchases />
          </ProtectedRouteWithRole>
        } />

        <Route path="/transfers" element={
          <ProtectedRouteWithRole allowedRoles={["admin", "logistics"]}>
            <Transfers />
          </ProtectedRouteWithRole>
        } />

        <Route path="/assignments" element={
          <ProtectedRouteWithRole allowedRoles={["admin", "commander"]}>
            <Assignments />
          </ProtectedRouteWithRole>
        } />

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
} 
 
export default App;
