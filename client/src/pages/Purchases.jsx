import { useState, useEffect } from "react";
import { addPurchase, getPurchases } from "../services/purchase";
import { getBases } from "../services/base";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function Purchases() {

    const token = useSelector((state) => state.auth.user.token);
    const [showForm, setShowForm] = useState(false);
    const [bases, setBases] = useState([]);
    const [form, setForm] = useState({
        assetType: "",
        quantity: "",
        baseId: "",
    });
    
    const [purchases, setPurchases] = useState([]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const fetchPurchases = async () => {
        try {
            const data = await getPurchases(token);
            setPurchases(data);
        } catch (error) {
            console.error("Error fetching purchases:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addPurchase(form, token);
            setForm({ assetType: "", quantity: "", baseId: "" });
            fetchPurchases();
        } catch (error) {
            console.error("Error adding purchase:", error);
            toast.error("Failed to add purchase.");
        } 
    }; 

    useEffect(() => {
        fetchPurchases();
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        const fetchBases = async () => {
            try {
                const data = await getBases(); 
                setBases(data);
                if (data.length == 1) {
                    setForm((prev) => ({ ...prev, baseId: data[0]._id }));
                }
            } catch (err) {
                console.log(err);
                toast.error("Failed to fetch base list");
            }
        };
        fetchBases();
    }, []);
  
    return (
        <div className="p-6">
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold mb-4 text-primary">Purchase Assets</h2>
                <div>
                    <button className="btn" onClick={()=>setShowForm(true)}>Log Purchase</button>
                </div>
            </div>
            
            {showForm &&
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
                        placeholder="e.g., Rifle, Jeep"
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
                <div className="flex justify-between">
                    <button className="btn" onClick={()=>setShowForm(false)}>Close</button>
                    <button type="submit" className="btn">Submit Purchase</button>
                </div>
                
            </form>
            }
            <h3 className="text-xl font-bold mb-3">Purchase History</h3>
            <div className="bg-white p-4 rounded shadow overflow-x-auto">
                <table className="min-w-full table-auto text-sm">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                        <th className="px-3 py-2">#</th>
                        <th className="px-3 py-2">Asset Type</th>
                        <th className="px-3 py-2">Quantity</th>
                        <th className="px-3 py-2">Base</th>
                        <th className="px-3 py-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchases?.map((p, i) => (
                        <tr key={p._id} className="border-t">
                            <td className="px-3 py-2">{i + 1}</td>
                            <td className="px-3 py-2">{p.assetType}</td>
                            <td className="px-3 py-2">{p.quantity}</td>
                            <td className="px-3 py-2">{p.baseId.name || p.baseId}</td>
                            <td className="px-3 py-2">{new Date(p.createdAt).toLocaleDateString("en-IN")}</td>
                        </tr>
                        ))}
                        {purchases.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center py-3 text-gray-500">
                            No purchases yet.
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Purchases;
