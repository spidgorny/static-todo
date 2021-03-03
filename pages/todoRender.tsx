import { TodoItem } from "./todoItem";
import { Badge } from "./badge";
import React, { useState } from "react";

export function TodoRender(props: {
  index: number;
  item: TodoItem;
  onChange: (index: number, item: TodoItem) => void;
}) {
  const [editable, setEditable] = useState(false);
  const [editTitle, setEditTitle] = useState(props.item.title);

  const onTick = (e: React.ChangeEvent) => {
    e.preventDefault();
    const item = props.item;
    let checkbox = e.target as HTMLInputElement;
    item.done = checkbox.checked;
    props.onChange(props.index, item);
  };

  const onChange = (e: React.FormEvent) => {
    e.preventDefault();
    const item = props.item;
    let titleElement = e.target as HTMLHeadingElement;
    item.title = titleElement.innerText;
    props.onChange(props.index, item);
  };

  return (
    <div
      id={props.item.id}
      className="border rounded p-1 m-1 flex flex-row"
      title="Drag to reorder, double-click to edit"
    >
      <div className="p-1 mx-2">
        <input
          type="checkbox"
          checked={props.item.done}
          onChange={onTick}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
      </div>
      <div className="flex-grow">
        <h6
          className="focus:outline-none cursor-text"
          onDoubleClick={(e: React.MouseEvent) => {
            e.preventDefault();
            setEditable(true);
            let input = e.target as HTMLInputElement;
            input.focus();
            input.selectionEnd = input.innerText.length;
            input.dispatchEvent(new Event("click"));
          }}
          contentEditable={editable}
          suppressContentEditableWarning={true}
          onKeyDown={(e: React.KeyboardEvent) => {
            // console.log(e.key);
            if (e.key === "Escape") {
              setEditTitle(props.item.title);
              setEditable(false);
            }
            if (e.key === "Enter") {
              e.preventDefault();
              onChange({
                target: e.target,
                preventDefault() {},
              } as React.FormEvent);
              setEditable(false);
            }
          }}
          // onInput={(e: FormEvent) =>
          //   setEditTitle((e.target as HTMLInputElement).innerText)
        >
          {editTitle}
        </h6>
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
