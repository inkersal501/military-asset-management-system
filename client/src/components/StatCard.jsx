function StatCard({ label, value }) {
  return (
    <div className="bg-white shadow p-4 rounded-lg text-center border">
      <h4 className="text-gray-600 text-sm">{label}</h4>
      <p className="text-xl font-bold text-primary mt-1">{value}</p>
    </div>
  );
}
export default StatCard;