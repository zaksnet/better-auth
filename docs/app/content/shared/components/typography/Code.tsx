export const Code = ({ children }: { children: React.ReactNode }) => {
  return (
    <code className="px-1 py-0.75 rounded bg-muted font-light font-mono text-sm">
      {children}
    </code>
  );
};