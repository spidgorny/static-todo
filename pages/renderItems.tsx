import { TodoItem } from "./todoItem";
import { TodoRender } from "./todoRender";
import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

export function RenderItems(props: { todoItems: TodoItem[] }) {
  const [winReady, setWinReady] = useState(false);
  useEffect(() => {
    setWinReady(true);
  }, []);

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    // this.setState({
    //   items,
    // });
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
