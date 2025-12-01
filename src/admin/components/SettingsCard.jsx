export default function SettingsCard({ title, descripcion, children }) {
  return (
    <div className="bg-[#1d1a17] rounded-lg p-6 shadow-md border border-[#2b2724]">
      <h2 className="text-xl font-semibold mb-1">{title}</h2>
      <p className="text-sm text-gray-400 mb-4">{descripcion}</p>
      {children}
    </div>
  );
}
