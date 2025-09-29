import React, { useState } from "react";
import { TableColumn } from "react-data-table-component";

const useResizableColumns = (columns: TableColumn<any>[]) => {
  const [colWidths, setColWidths] = useState<{ [key: string]: number }>({});

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    columnName: string,
    direction: "left" | "right",
    prevColName?: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startWidth = colWidths[columnName] || 150;
    const prevWidth = prevColName ? colWidths[prevColName] || 150 : undefined;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;

      setColWidths((prev) => {
        const updated = { ...prev };

        if (direction === "right") {
          updated[columnName] = Math.max(80, startWidth + deltaX);
        } else if (direction === "left" && prevColName) {
          const newPrevWidth = Math.max(80, (prevWidth ?? 150) + deltaX);
          const newThisWidth = Math.max(80, startWidth - deltaX);
          updated[prevColName] = newPrevWidth;
          updated[columnName] = newThisWidth;
        }
        return updated;
      });
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const resizableColumns = columns.map((col, index) => {
    const colName = col.name as string;
    const prevColName = index > 0 ? (columns[index - 1].name as string) : undefined;
    const width = colWidths[colName] || 150;

    return {
      ...col,
      name: (
        <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
          {/* Left Handle */}
          {index > 0 && (
            <div
              onMouseDown={(e) => handleMouseDown(e, colName, "left", prevColName)}
              style={{
                cursor: "col-resize",
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "6px",
                zIndex: 2,
              }}
            />
          )}

          {/* Column Label */}
          <span style={{ flex: 1, textAlign: "center" }}>{col.name}</span>

          {/* Right Handle */}
          <div
            onMouseDown={(e) => handleMouseDown(e, colName, "right")}
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
