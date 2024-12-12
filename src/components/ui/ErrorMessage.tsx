export default function ErrorMessage({ children }: { children: React.ReactNode }) {
  return <div className="text-xs text-red-600 ml-1">{children}</div>;
}
