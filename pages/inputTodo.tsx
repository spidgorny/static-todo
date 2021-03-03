import { TodoItem } from "./todoItem";
import React from "react";

export function InputTodo(props: { onNew: (item: TodoItem) => void }) {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let form = e.target as HTMLFormElement;
    let title = form.elements[1] as HTMLInputElement;
    if (!title.value) {
      return;
    }
    let todoItem = new TodoItem(title.value as string, {});
    props.onNew(todoItem);
    title.value = "";
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="border rounded p-1 m-1 flex flex-row">
        <div className="p-1 mx-2">
          <input
            type="checkbox"
            disabled={true}
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
        </div>
        <div className="flex-grow">
          <input
            type="text"
            name="title"
            className="block w-full rounded-none p-1 focus:outline-none"
            placeholder="new todo"
            autoComplete={"no"}
            autoFocus={true}
            onBlur={(e: React.FocusEvent) =>
              (e.target as HTMLInputElement)
                .closest("form")
                .dispatchEvent(new Event("submit"))
            }
          />
        </div>
      </div>
    </form>
  );
}
