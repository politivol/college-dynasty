export function OCRProgress({ progress }: { progress: number }) {
  return (
    <div className="w-full bg-gray-200">
      <div className="bg-blue-500 h-2" style={{ width: `${progress}%` }} />
    </div>
  );
}
export default OCRProgress;
