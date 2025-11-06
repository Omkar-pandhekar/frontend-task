import { ColumnConfig, RowData } from "../types";

/**
 * Export selected visible columns to CSV
 */
export function toCSV(rows: RowData[], columns: ColumnConfig[]): string {
  const visible = columns.filter((c) => c.visible);
  const headers = visible.map((c) => c.label || c.key);
  const keys = visible.map((c) => c.key);

  const lines: string[] = [headers.join(",")];

  for (const row of rows) {
    const vals = keys.map((k) => {
      const raw = row[k] ?? "";
      const s = String(raw).replaceAll('"', '""');
      if (s.includes(",") || s.includes('"') || s.includes("\n")) {
        return `"${s}"`;
      }
      return s;
    });
    lines.push(vals.join(","));
  }

  return lines.join("\n");
}
