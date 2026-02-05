export default function Badge({ children, variant = "default" }) {
  const base =
    "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border";

  const variants = {
    default: "bg-gray-100 text-gray-700 border-gray-200",
    primary: "bg-blue-50 text-blue-700 border-blue-200",
    success: "bg-green-50 text-green-700 border-green-200",
    warning: "bg-yellow-50 text-yellow-700 border-yellow-200",
  };

  return <span className={`${base} ${variants[variant]}`}>{children}</span>;
}
