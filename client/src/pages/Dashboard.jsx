import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboard";
import StatCard from "../components/StatCard";
import { getBases } from "../services/base";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function Dashboard() {

    const token = useSelector((state) => state.auth.user.token);
    const [bases, setBases] = useState([]);
    const [filters, setFilters] = useState({
        baseId: "",
        equipmentType: "",
        startDate: "",
        endDate: ""
    });

    const [stats, setStats] = useState(null);

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const fetchStats = async () => {
        try {
            const data = await getDashboardStats(filters, token);
            setStats(data);
        } catch (err) {
            console.error("Dashboard error:", err);
        }
    };

    useEffect(() => {
        fetchStats();
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
            <h2 className="text-3xl font-bold text-primary mb-4">Military Asset Dashboard</h2>
    
            <div className="flex flex-wrap gap-4 mb-6"> 
                <select
                    name="baseId"
                    value={filters.baseId}
                    onChange={handleChange}
                    className="input border p-2 rounded"
                    required
                    > 
                    {bases.map((base) => (
                        <option key={base._id} value={base._id}>
                        {base.name}
                        </option>
                    ))}
                </select>
                <input
                    name="equipmentType"
                    placeholder="Equipment Type"
                    value={filters.equipmentType}
                    onChange={handleChange}
                    className="input border p-2 rounded"
                />
                <input
                    type="date"
                    name="startDate"
                    value={filters.startDate}
                    onChange={handleChange}
                    className="input border p-2 rounded"
                />
                <input
                    type="date"
                    name="endDate"
                    value={filters.endDate}
                    onChange={handleChange}
                    className="input border p-2 rounded"
                />
                <button
                    onClick={fetchStats}
                    className="btn bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Apply Filter
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard label="Opening Balance" value={stats?.openingBalance || 0} />
                <StatCard label="Closing Balance" value={stats?.closingBalance || 0} />
                <StatCard label="Net Movement" value={stats?.netMovement || 0} />
                <StatCard label="Assigned" value={stats?.assigned || 0} />
                <StatCard label="Expended" value={stats?.expended || 0} />
            </div>

            {/*Movement breakdown */}
            {stats?.movementDetails && (
                <div className="mt-6">
                <h4 className="text-xl font-semibold mb-2">Net Movement Breakdown</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <StatCard label="Purchases" value={stats.movementDetails.purchases || 0} />
                    <StatCard label="Transfers In" value={stats.movementDetails.transfersIn || 0} />
                    <StatCard label="Transfers Out" value={stats.movementDetails.transfersOut || 0} />
                </div>
                </div>
            )}
        </div>
    );
}



export default Dashboard;
