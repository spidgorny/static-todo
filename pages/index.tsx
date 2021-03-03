import Head from "next/head";
import { TodoItem } from "./todoItem";
import React from "react";
import { RenderItems } from "./renderItems";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import Spinner from "../components/spinner";
import { DangerText, FillButton } from "tailwind-react-ui";
import { InputTodo } from "./inputTodo";

export default function Home() {
  const { isLoading, error, data, refetch } = useQuery(
    ["todo", "default"],
    async () => {
      const res = await axios.get("/api/todo/default");
      console.log(res.status, res.data);
      return res.data.map((el) => new TodoItem(el.title, el));
    }
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (todos: TodoItem[]) => axios.post("/api/todo/default", todos),
    {
      onSuccess: async (data, variables, context) => {
        await queryClient.invalidateQueries(["/todo", "default"]);
        await refetch();
      },
    }
  );

  const onNew = (item: TodoItem) => {
    // console.log(item);
    data.unshift(item);
    mutation.mutate(data);
  };

  return (
    <div className="container mx-auto">
      <Head>
        <title>Stratos ToDos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Stratos ToDos</h1>
        {data && <InputTodo onNew={onNew} />}
        {isLoading && <Spinner />}
        {error && <DangerText>{error}</DangerText>}
        {data && <RenderItems todoItems={data} onChange={mutation.mutate} />}
        {data && (
          <div className="clear-both">
            <FillButton
              className="float-right"
              bg="blue-300"
              onClick={() => mutation.mutate(data)}
              m={2}
            >
              Save
            </FillButton>
          </div>
        )}
      </main>

      <footer className="border-t">&copy; 2021 AppDev</footer>
    </div>
  );
}
