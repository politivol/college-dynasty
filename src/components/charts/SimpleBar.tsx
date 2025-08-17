export function SimpleBar({ value }: { value: number }) {
  return (
    <div className="w-full bg-gray-200">
      <div className="bg-blue-500 h-2" style={{ width: `${value}%` }} />
    </div>
  );
}
export default SimpleBar;
