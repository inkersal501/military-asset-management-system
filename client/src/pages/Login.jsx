import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { toast } from "react-toastify";
 
function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(email, password);
            dispatch(login(data));
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (err) {
            console.log(err);
            toast.error("Login Failed");
        }
    };

    return (
        <div className="h-screen w-full flex items-center justify-center bg-yellow-50">
            <div className="w-[40%] text-center">
                <h2 className='text-3xl mb-5'>Welcome to</h2>
                <h1 className="text-5xl text-primary">Military Asset Management System</h1>
            </div>
            <div className="w-[40%] flex items-center justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded shadow-lg rounded-2xl w-100"
                >
                    <h2 className="text-3xl font-bold mb-8">Login</h2>
                    <input
                        type="email"
                        className="input mb-5 w-full border p-2 rounded"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className="input mb-8 w-full border p-2 rounded"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="btn">
                        Login
                    </button>
                    <div className="py-4">
                        <span>Not yet registered? </span> <Link to="/register" className="text-primary">Register here.</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
