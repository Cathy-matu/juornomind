export default function NavItem({ icon: Icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      aria-label={label}
      className={`flex flex-col items-center gap-1 transition-colors ${
        active ? 'text-teal-600' : 'text-gray-500'
      }`}
    >
      {Icon ? <Icon className="text-2xl" /> : <span className="text-2xl">•</span>}
      <span className="text-[10px]">{label}</span>
    </button>
  );
}
