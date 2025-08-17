"use client";
import { useState } from "react";

export function EditableTable({ rows }: { rows: Record<string, any>[] }) {
  const [data, setData] = useState(rows);
  return (
    <table className="w-full">
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-b">
            {Object.keys(row).map((key) => (
              <td key={key} className="p-1">
                <input
                  value={row[key]}
                  onChange={(e) => {
                    const copy = [...data];
                    copy[i][key] = e.target.value;
                    setData(copy);
                  }}
                  className="border p-1 w-full"
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default EditableTable;
