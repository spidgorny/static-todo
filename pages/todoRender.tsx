import { TodoItem } from "./todoItem";
import { Badge } from "./badge";
import React from "react";

export function TodoRender(props: {
  index: number;
  item: TodoItem;
  onChange: (index: number, item: TodoItem) => void;
}) {
  const onChange = (e: React.ChangeEvent) => {
    e.preventDefault();
    const item = props.item;
    let checkbox = e.target as HTMLInputElement;
    item.done = checkbox.checked;
    props.onChange(props.index, item);
  };

  return (
    <div id={props.item.id} className="border rounded p-1 m-1 flex flex-row">
      <div className="p-1 mx-2">
        <input
          type="checkbox"
          checked={props.item.done}
          onChange={onChange}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
      </div>
      <div className="flex-grow">
        <h6>{props.item.title}</h6>
        {props.item.status && <Badge>Status: {props.item.status}</Badge>}{" "}
        {props.item.tags &&
          props.item.tags.map((tag: string) => (
            <Badge key={tag} color="bg-blue-600">
              {tag}
            </Badge>
          ))}
      </div>
    </div>
  );
}
