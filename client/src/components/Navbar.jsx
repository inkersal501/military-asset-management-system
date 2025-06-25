import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

function Navbar() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout()); 
        navigate("/");
    };

    return (
        <nav className="bg-primary text-white px-6 py-4 shadow-md flex justify-between items-center">
            <h1 className="text-xl font-bold">Military Asset Management System</h1>

            <ul className="flex gap-6 items-center">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) => isActive ? "navlink active" : "navlink"}
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="/purchases"
                    className={({ isActive }) => isActive ? "navlink active" : "navlink"}
                >
                    Purchases
                </NavLink>
                <NavLink
                    to="/transfers"
                    className={({ isActive }) => isActive ? "navlink active" : "navlink"}
                >
                    Transfers
                </NavLink>
                <NavLink
                    to="/assignments"
                    className={({ isActive }) => isActive ? "navlink active" : "navlink"}
                >
                    Assignments
                </NavLink>
                <button
                    onClick={handleLogout}
                    className="btn-light"
                >
                    Logout
                </button>
            </ul>
        </nav>
    );
}

export default Navbar;
