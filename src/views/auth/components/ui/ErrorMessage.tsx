export default function ErrorMessage({ children }: { children: React.ReactNode }) {
  return <div className="ml-1 text-xs text-red-600">{children}</div>;
}
