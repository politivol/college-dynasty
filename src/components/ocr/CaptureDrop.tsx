"use client";
import { useDropzone } from "react-dropzone";

export function CaptureDrop({ onFile }: { onFile: (file: File) => void }) {
  const { getRootProps, getInputProps } = useDropzone({ onDrop: (files) => onFile(files[0]) });
  return (
    <div {...getRootProps()} className="ocr-drop">
      <input {...getInputProps()} />
      <p>Drop or click to upload</p>
    </div>
  );
}
