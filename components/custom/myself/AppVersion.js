export default function AppVersion({ className = "" }) {
  return (
    <span className={`text-xs text-gray-500 ${className}`}>
      v{process.env.NEXT_PUBLIC_APP_VERSION}
    </span>
  );
}
