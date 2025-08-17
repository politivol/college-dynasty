"use client";
import { useState } from "react";

export function PollComposer({ onSubmit }: { onSubmit?: (question: string, options: string[]) => void }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(question, options.filter(Boolean));
        setQuestion("");
        setOptions(["", ""]);
      }}
      className="space-y-2"
    >
      <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Question" className="border p-2 w-full" />
      {options.map((opt, i) => (
        <input
          key={i}
          value={opt}
          onChange={(e) => {
            const copy = [...options];
            copy[i] = e.target.value;
            setOptions(copy);
          }}
          className="border p-2 w-full"
        />
      ))}
      <button type="button" onClick={() => setOptions([...options, ""]) } className="px-2 py-1 bg-gray-200">
        Add Option
      </button>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
        Create
      </button>
    </form>
  );
}
