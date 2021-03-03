import Head from "next/head";
import { TodoItem } from "./todoItem";
import React from "react";
import { RenderItems } from "./renderItems";
import { useQuery } from "react-query";
import axios from "axios";
import Spinner from "../components/spinner";
import { DangerText } from "tailwind-react-ui";

export default function Home() {
  const { isLoading, error, data } = useQuery(["todo", "default"], async () => {
    const res = await axios.get("/api/todo/default");
    console.log(res.status, res.data);
    return res.data.map((el) => new TodoItem(el.title, el));
  });

  return (
    <div className="container mx-auto">
      <Head>
        <title>Stratos ToDos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Stratos ToDos</h1>
        <div className="col-span-3 sm:col-span-2 hidden">
          <label
            htmlFor="company_website"
            className="block text-sm font-medium text-gray-700"
          >
            Website
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              http://
            </span>
            <input
              type="text"
              name="company_website"
              id="company_website"
              className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
              placeholder="www.example.com"
            />
          </div>
        </div>
        {isLoading && <Spinner />}
        {error && <DangerText>{error}</DangerText>}
        {data && <RenderItems todoItems={data} />}
      </main>

      <footer className="border-t">&copy; 2021 AppDev</footer>
    </div>
  );
}
