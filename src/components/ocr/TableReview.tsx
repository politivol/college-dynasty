import EditableTable from "../tables/EditableTable";

export function TableReview({ rows }: { rows: Record<string, any>[] }) {
  return <EditableTable rows={rows} />;
}
export default TableReview;
