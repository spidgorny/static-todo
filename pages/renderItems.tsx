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

    // didn't move
    if (result.source.index === result.destination.index) {
      return;
    }

    const newTodos = reorder(
      props.todoItems,
      result.source.index,
      result.destination.index
    );
    // console.log(newTodos.map((x) => x.title));

    props.onChange(newTodos);
  };

  const onDone = (index: number, item: TodoItem) => {
    const copy = props.todoItems;
    copy[index] = item;
    props.onChange(copy);
  };

  const onDelete = (index: number) => {
    const copy = props.todoItems;
    copy.splice(index, 1);
    props.onChange(copy);
  };

  if (!winReady) {
    // https://github.com/atlassian/react-beautiful-dnd/issues/1756
    return (
      <div>
        {props.todoItems.map((item: TodoItem, index: number) => (
          <TodoRender
            key={item.id}
            item={item}
            index={index}
            onChange={onDone}
            onDelete={onDelete}
          />
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
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TodoRender
                      key={item.id}
                      index={index}
                      item={item}
                      onChange={onDone}
                      onDelete={onDelete}
                    />
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
