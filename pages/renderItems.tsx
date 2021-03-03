import { TodoItem } from "./todoItem";
import { TodoRender } from "./todoRender";
import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

const reorder = (list: TodoItem[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export function RenderItems(props: {
  todoItems: TodoItem[];
  onChange: (todos: TodoItem[]) => void;
}) {
  const [winReady, setWinReady] = useState(false);
  useEffect(() => {
    setWinReady(true);
  }, []);

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newTodos = reorder(
      props.todoItems,
      result.source.index,
      result.destination.index
    );
    console.log(newTodos.map((x) => x.title));

    props.onChange(newTodos);
  };

  if (!winReady) {
    // https://github.com/atlassian/react-beautiful-dnd/issues/1756
    return (
      <div>
        {props.todoItems.map((item: TodoItem, index: number) => (
          <TodoRender key={item.title} item={item} />
        ))}
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {props.todoItems.map((item: TodoItem, index: number) => (
              <Draggable
                key={item.title}
                draggableId={item.title}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TodoRender key={item.title} item={item} />
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
}
