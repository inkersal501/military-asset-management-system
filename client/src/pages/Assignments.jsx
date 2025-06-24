import { useState, useEffect } from "react";
import { assignAsset, getAssignments } from "../services/assignment";
import { toast } from "react-toastify";
import { getBases } from "../services/base";

function Assignments() {

    const token = localStorage.getItem("token");
    const [bases, setBases] = useState([]);
    const [form, setForm] = useState({
        assetType: "",
        quantity: "",
        personnelName: "",
        baseId: ""
    });

    const [assignments, setAssignments] = useState([]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await assignAsset(form, token);
            setForm({ assetType: "", quantity: "", personnelName: "", baseId: "" });
            fetchAssignments();
        } catch (error) {
            console.error("Error assigning asset:", error);
            alert("Failed to assign asset.");
        }
    };

    const fetchAssignments = async () => {
        try {
            const data = await getAssignments(token);
            setAssignments(data);
        } catch (error) {
            console.error("Error fetching assignments:", error);
        }
    };

    useEffect(() => {
        fetchAssignments();
        //eslint-disable-next-line
    }, []);


    useEffect(() => {
        const fetchBases = async () => {
            try {
                const data = await getBases(); 
                setBases(data); 
            } catch (err) {
                console.log(err);
                toast.error("Failed to fetch base list");
            }
        };
        fetchBases();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-primary">Assign or Expend Assets</h2>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-lg rounded-2xl mb-8 space-y-4 w-full max-w-lg"
            >
                <div>
                    <label className="block font-semibold">Asset Type</label>
                    <input
                        type="text"
                        name="assetType"
                        value={form.assetType}
                        onChange={handleChange}
                        className="input w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block font-semibold">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={form.quantity}
                        onChange={handleChange}
                        className="input w-full border p-2 rounded"
                        min="1"
                    />
                </div>

                <div>
                    <label className="block font-semibold">Personnel Name</label>
                    <input
                        type="text"
                        name="personnelName"
                        value={form.personnelName}
                        onChange={handleChange}
                        className="input w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block font-semibold">Base</label>
                    <select
                        name="baseId"
                        value={form.baseId}
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
                </div>

                <button
                    type="submit"
                    className="btn"
                >
                    Assign Asset
                </button>
            </form>

            <h3 className="text-xl font-bold mb-3">Assignment & Expenditure History</h3>
            <div className="bg-white p-4 rounded shadow overflow-x-auto">
                <table className="min-w-full table-auto text-sm">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                        <th className="px-3 py-2">#</th>
                        <th className="px-3 py-2">Asset Type</th>
                        <th className="px-3 py-2">Quantity</th>
                        <th className="px-3 py-2">Personnel</th>
                        <th className="px-3 py-2">Base</th>
                        <th className="px-3 py-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments?.map((a, i) => (
                        <tr key={a._id} className="border-t">
                            <td className="px-3 py-2">{i + 1}</td>
                            <td className="px-3 py-2">{a.assetType}</td>
                            <td className="px-3 py-2">{a.quantity}</td>
                            <td className="px-3 py-2">{a.personnelName}</td>
                            <td className="px-3 py-2">{a.base?.name || a.baseId}</td>
                            <td className="px-3 py-2">{new Date(a.createdAt).toLocaleDateString()}</td>
                        </tr>
                        ))}
                        {assignments.length === 0 && (
                        <tr>
                            <td colSpan="6" className="text-center py-3 text-gray-500">
                                No assignment records found.
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Assignments;
 
