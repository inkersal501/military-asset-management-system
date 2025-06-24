import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { getBases } from "../services/base";

function Register() {
  
  const navigate = useNavigate();
  const [bases, setBases] = useState([]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "commander",
    baseId: "",
  });

  useEffect(() => {
    const fetchBases = async () => {
      try {
        const data = await getBases(); 
        setBases(data);
        if (data.length > 0) {
          setFormData((prev) => ({ ...prev, baseId: data[0]._id }));
        }
      } catch (err) {
        console.log(err);
        toast.error("Failed to fetch base list");
      }
    };
    fetchBases();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-[400px]">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Register</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="input w-full mb-3"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="input w-full mb-3"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="input w-full mb-3"
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="input w-full mb-3"
          required
        >
          <option value="admin">Admin</option>
          <option value="commander">Base Commander</option>
          <option value="logistics">Logistics Officer</option>
        </select>

        <select
          name="baseId"
          value={formData.baseId}
          onChange={handleChange}
          className="input w-full mb-4"
          required
        >
          {bases.map((base) => (
            <option key={base._id} value={base._id}>
              {base.name}
            </option>
          ))}
        </select>

        <button type="submit" className="btn bg-primary text-white w-full">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
