import { useEffect, useState } from "react";
import { addTransfer, getTransfers } from "../services/transfer";
import { getBases } from "../services/base";
import { toast } from "react-toastify";

function Transfers() {
    
    const token = localStorage.getItem("token");
    const [bases, setBases] = useState([]);
    const [form, setForm] = useState({
        assetType: "",
        quantity: "",
        fromBaseId: "",
        toBaseId: ""
    });

    const [transfers, setTransfers] = useState([]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addTransfer(form, token);
            setForm({ assetType: "", quantity: "", fromBaseId: "", toBaseId: "" });
            fetchTransfers();
        } catch (err) {
            console.error("Transfer Error:", err);
            alert("Failed to submit transfer");
        }
    };

    const fetchTransfers = async () => {
        try {
            const data = await getTransfers(token);
            setTransfers(data);
        } catch (err) {
            console.error("Fetch Transfers Error:", err);
        }
    };

    useEffect(() => {
        fetchTransfers();
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
            <h2 className="text-2xl font-bold mb-4 text-primary">Transfer Assets Between Bases</h2>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-lg rounded-2xl mb-8 space-y-4 w-full max-w-lg">
                <div>
                    <label className="block font-semibold">Asset Type</label>
                    <input
                        type="text"
                        name="assetType"
                        value={form.assetType}
                        onChange={handleChange}
                        className="input w-full border p-2 rounded"
                        placeholder="e.g., Rifle"
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
                    />
                </div>
                <div>
                    <label className="block font-semibold">From Base</label>
                    <select
                        name="fromBaseId"
                        value={form.fromBaseId}
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
                <div>
                    <label className="block font-semibold">To Base</label>
                    <select
                        name="toBaseId"
                        value={form.toBaseId}
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

                <button type="submit" className="btn">
                    Transfer Asset
                </button>
            </form>

            <h3 className="text-xl font-bold mb-3">Transfer History</h3>
            <div className="bg-white p-4 rounded shadow overflow-x-auto">
                <table className="min-w-full table-auto text-sm">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                        <th className="px-3 py-2">#</th>
                        <th className="px-3 py-2">Asset Type</th>
                        <th className="px-3 py-2">Quantity</th>
                        <th className="px-3 py-2">From</th>
                        <th className="px-3 py-2">To</th>
                        <th className="px-3 py-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transfers?.map((t, i) => (
                        <tr key={t._id} className="border-t">
                            <td className="px-3 py-2">{i + 1}</td>
                            <td className="px-3 py-2">{t.assetType}</td>
                            <td className="px-3 py-2">{t.quantity}</td>
                            <td className="px-3 py-2">{t.fromBase?.name || t.fromBaseId}</td>
                            <td className="px-3 py-2">{t.baseId.name || t.toBaseId}</td>
                            <td className="px-3 py-2">{new Date(t.createdAt).toLocaleDateString()}</td>
                        </tr>
                        ))}
                        {transfers.length === 0 && (
                        <tr>
                            <td colSpan="6" className="text-center py-3 text-gray-500">
                                No transfers recorded.
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Transfers;
