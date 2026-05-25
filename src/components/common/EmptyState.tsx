type EmptyStateProps = {
  title: string;
  description?: React.ReactNode;
  className?: string;
};

export default function EmptyState({ title, description, className = "" }: EmptyStateProps) {
  return (
    <div
      className={`border-border-sub col-span-full flex min-h-[220px] flex-col items-center justify-center rounded-md border-2 border-dashed bg-[#FDF6E9] text-center ${className}`}
    >
      <p className="text-title-main text-lg font-bold">{title}</p>

      {description && <p className="mt-2 text-sm opacity-70">{description}</p>}
    </div>
  );
}
