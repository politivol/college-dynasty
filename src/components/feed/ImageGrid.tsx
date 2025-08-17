type Props = { images: string[] };
export function ImageGrid({ images }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {images.map((src) => (
        <img key={src} src={src} alt="" />
      ))}
    </div>
  );
}
export default ImageGrid;
