export default function ToggleSwitch({ value, onChange }) {
  return (
    <div
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all 
      ${value ? "bg-[#bfa16a]" : "bg-[#3a3531]"}`}
      onClick={() => onChange(!value)}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all
        ${value ? "translate-x-6" : "translate-x-0"}`}
      ></div>
    </div>
  );
}
