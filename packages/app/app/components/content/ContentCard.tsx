import clsxm from "@/src/lib/clsxm";

type ContentCardProps = {
    children: React.ReactNode;
    className?: string;
}
export const ContentCard = ({ children, className }: ContentCardProps) => {
  return (
    <div className={clsxm("flex flex-col bg-gray-800 rounded-2xl p-2 gap-2", className)}>
      {children}
    </div>
  );
}
