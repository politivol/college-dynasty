type Props = { label: string; value: string | number };
export function StatBadge({ label, value }: Props) {
  return (
    <div className="p-2 bg-gray-100 rounded">
      <div className="text-xs">{label}</div>
      <div className="font-bold">{value}</div>
    </div>
  );
}
export default StatBadge;
