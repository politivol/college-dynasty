"use client";
import { useState } from "react";

export function PostComposer({ onSubmit }: { onSubmit?: (data: { title: string; body: string }) => void }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.({ title, body });
        setTitle("");
        setBody("");
      }}
      className="space-y-2"
    >
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="border p-2 w-full" />
      <textarea value={body} onChange={(e) => setBody(e.target.value)} className="border p-2 w-full" />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
        Post
      </button>
    </form>
  );
}
