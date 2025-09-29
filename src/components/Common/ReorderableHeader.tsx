import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ReorderableHeader = ({ columns, setColumns }: any) => {
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const newCols = Array.from(columns);
    const [moved] = newCols.splice(result.source.index, 1);
    newCols.splice(result.destination.index, 0, moved);
    setColumns(newCols);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} style={{ display: "flex" }}>
            {columns.map((col: any, index: number) => (
              <Draggable key={col.name as string} draggableId={col.name as string} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{ flex: 1, ...provided.draggableProps.style }}
                  >
                    {col.name}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ReorderableHeader;

// Okay Tell me how can I reorder some particular component by drag & drop so how can we.