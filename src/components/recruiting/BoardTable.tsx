type Target = { id: string; name: string; position: string; stars: number };
export function BoardTable({ targets }: { targets: Target[] }) {
  return (
    <table className="w-full">
      <tbody>
        {targets.map((t) => (
          <tr key={t.id} className="border-b">
            <td>{t.name}</td>
            <td>{t.position}</td>
            <td>{t.stars}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default BoardTable;
