import React, { useState } from "react";
import { TableColumn } from "react-data-table-component";

const useResizableColumns = (columns: TableColumn<any>[]) => {
  const [colWidths, setColWidths] = useState<{ [key: string]: number }>({});

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    columnName: string ) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startWidth = colWidths[columnName] || 150;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;

      setColWidths((prev) => ({
        ...prev,
        [columnName]: Math.max(80, startWidth + deltaX), // min width safeguard
      }));
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const resizableColumns = columns.map((col) => {
    const colName = col.name as string;
    const width = colWidths[colName] || 160;

    return {
      ...col,
      name: (
        <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
          {/* Column Label */}
          <span style={{ flex: 1, textAlign: "center" }}>{col.name}</span>

          {/* Resize Handle (right edge only) */}
          <div
            onMouseDown={(e) => handleMouseDown(e, colName)}
            style={{
              cursor: "col-resize",
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "6px",
              zIndex: 2,
            }}
          />
        </div>
      ),
      minWidth: `${width}px`,
      style: { width: `${width}px` },
    };
  });

  return resizableColumns;
};

export default useResizableColumns;
