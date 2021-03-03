import { NextApiRequest, NextApiResponse } from "next";
import { TodoItem } from "../../todoItem";
import path from "path";
import * as fs from "fs";

function saveTodos(list: string, todos: TodoItem[]) {
  const json = JSON.stringify(todos, null, 2);
  const file = path.resolve(process.cwd(), "data/" + list + ".json");
  fs.writeFileSync(file, json);
}

function loadTodos(list: string): TodoItem[] {
  const file = path.resolve(process.cwd(), "data/" + list + ".json");
  const json = fs.readFileSync(file).toString();
  const data = JSON.parse(json);
  return data;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { list },
  } = req;

  if (req.method === "POST") {
    return post(req, res, list as string);
  }

  const todos = loadTodos(list as string);
  res.json(todos);
}

function post(req: NextApiRequest, res: NextApiResponse, list: string) {
  const todos = req.body;
  saveTodos(list, todos);

  res.json({
    status: "ok",
    length: todos.length,
  });
}
