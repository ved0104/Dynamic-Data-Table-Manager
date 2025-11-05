import Papa from 'papaparse';
import { Row } from '../types';

export function parseCsv(file: File): Promise<{ data: Row[]; errors: string[] }> {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const errors: string[] = [];
        const data: Row[] = (results.data as any[]).map((r, i) => ({
          id: r.id ?? `r_${Date.now()}_${i}`,
          name: r.name ?? r.Name ?? '',
          email: r.email ?? r.Email ?? '',
          age: r.age ? Number(r.age) : r.Age ? Number(r.Age) : null,
          role: r.role ?? r.Role ?? '',
          ...r,
        }));
        if (results.errors && results.errors.length) {
          results.errors.forEach((e) => errors.push(e.message));
        }
        resolve({ data, errors });
      },
      error: (err) => resolve({ data: [], errors: [String(err)] }),
    });
  });
}

export function exportCsv(rows: any[], columns: { key: string; label: string }[]) {
  const headers = columns.map((c) => c.label);
  const keys = columns.map((c) => c.key);
  const csv = [headers.join(',')]
    .concat(rows.map((r) => keys.map((k) => `"${r[k] ?? ''}"`).join(',')))
    .join('\n');
  return new Blob([csv], { type: 'text/csv;charset=utf-8;' });
}
