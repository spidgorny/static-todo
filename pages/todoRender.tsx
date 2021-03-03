import { TodoItem } from "./todoItem";
import { Badge } from "./badge";

export function TodoRender(props: { item: TodoItem }) {
  return (
    <div className="border rounded p-1 m-1 flex flex-row">
      <div className="p-1 mx-2">
        <input
          type="checkbox"
          disabled={!props.item.done}
          checked={props.item.done}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
      </div>
      <div className="flex-grow">
        <h1>{props.item.title}</h1>
        {props.item.status && <Badge>Status: {props.item.status}</Badge>}{" "}
        {props.item.tags &&
          props.item.tags.map((tag: string) => (
            <Badge color="bg-blue-600">{tag}</Badge>
          ))}
      </div>
    </div>
  );
}
