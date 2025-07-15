import * as React from "react";
import { Edit, Trash2, ChevronDown, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";

interface Column<T> {
  header: string;
  accessor: keyof T;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

export function DataTable<T extends { id: string | number }>({ columns, data, onEdit, onDelete }: DataTableProps<T>) {
  const [sortBy, setSortBy] = React.useState<keyof T | null>(null);
  const [sortDir, setSortDir] = React.useState<'asc' | 'desc'>('asc');
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);

  const handleSort = (accessor: keyof T) => {
    if (sortBy === accessor) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(accessor);
      setSortDir('asc');
    }
  };

  // Filter
  const filteredData = React.useMemo(() => {
    if (!search.trim()) return data;
    const lower = search.toLowerCase();
    return data.filter(row =>
      columns.some(col => String(row[col.accessor] ?? '').toLowerCase().includes(lower))
    );
  }, [data, search, columns]);

  // Sort
  const sortedData = React.useMemo(() => {
    if (!sortBy) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      if (aValue === bValue) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDir === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return sortDir === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [filteredData, sortBy, sortDir]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  React.useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);
  const paginatedData = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, page, pageSize]);

  return (
    <div className="overflow-x-auto rounded border border-gray-200">
      {/* Search */}

      <table className="min-w-[600px] w-full bg-white">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.header}
                className="px-2 py-2 md:px-4 md:py-2 text-left text-sm font-semibold text-gray-700 border-b bg-gray-100 cursor-pointer select-none"
                onClick={() => handleSort(col.accessor)}
              >
                <span className="flex items-center gap-1">
                  {col.header}
                  {sortBy === col.accessor && (
                    <span>{sortDir === 'asc' ? '▲' : '▼'}</span>
                  )}
                </span>
              </th>
            ))}
            {(onEdit || onDelete) && <th className="px-2 py-2 md:px-4 md:py-2 text-xs md:text-sm font-semibold text-gray-700 border-b bg-gray-100">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="px-2 py-4 md:px-4 text-center text-gray-400 text-xs md:text-sm">No data</td>
            </tr>
          ) : (
            paginatedData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer">
                {columns.map((col) => (
                  <td key={String(col.accessor)} className="px-2 py-2 md:px-4 md:py-2 border-b text-sm text-gray-800">
                    {String(row[col.accessor])}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-2 py-2 md:px-4 md:py-2 border-b flex gap-2">
                    {onEdit && (
                      <button type="button" onClick={() => onEdit(row)} className="text-blue-600 hover:text-blue-800">
                        <Edit size={18} />
                      </button>
                    )}
                    {onDelete && (
                      <button type="button" onClick={() => onDelete(row)} className="text-red-600 hover:text-red-800">
                        <Trash2 size={18} />
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div className="flex justify-end items-center gap-2 p-2 border-t bg-white">
        <span className="text-sm text-gray-600">Rows per page:</span>
        <div className="relative">
          <select
            value={pageSize}
            onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
            className="border rounded px-1 py-0.5 text-sm text-gray-700 focus:outline-none appearance-none pr-6"
            style={{ minWidth: 40 }}
          >
            {[5, 10, 20, 50, 100].map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
        </div>
        <span className="text-xs text-gray-600">
          {paginatedData.length === 0 ? 0 : (page - 1) * pageSize + 1}
          -{(page - 1) * pageSize + paginatedData.length} of {sortedData.length}
        </span>
        <button
          className="px-1 py-0.5 rounded text-xs text-gray-400 hover:text-gray-700 disabled:opacity-30"
          onClick={() => setPage(1)}
          disabled={page === 1}
          aria-label="First page"
        >
          <ChevronsLeft className="w-6 h-6" />
        </button>
        <button
          className="px-1 py-0.5 rounded text-xs text-gray-400 hover:text-gray-700 disabled:opacity-30"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-6 h-6 " />
        </button>
        <button
          className="px-1 py-0.5 rounded text-xs text-gray-400 hover:text-gray-700 disabled:opacity-30"
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          aria-label="Next page"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <button
          className="px-1 py-0.5 rounded text-xs text-gray-400 hover:text-gray-700 disabled:opacity-30"
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
          aria-label="Last page"
        >
          <ChevronsRight className="w-6 h-6" />
        </button>
      </div>
      {/*       
        // For a true mobile card view, you could map data and render each row as a card here
        // Example:
        // <div className="md:hidden">
        //   {data.map(row => (
        //     <div key={row.id} className="bg-white rounded shadow p-4 mb-2">
        //       {columns.map(col => (
        //         <div key={col.header} className="flex justify-between text-xs mb-1">
        //           <span className="font-semibold">{col.header}:</span>
        //           <span>{String(row[col.accessor])}</span>
        //         </div>
        //       ))}
        //       // Actions here
        //     </div>
        //   ))}
        // </div>
      */}
    </div>
  );
} 