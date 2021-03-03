import Head from "next/head";
import { TodoItem } from "./todoItem";
import { TodoRender } from "./todoRender";

export default function Home() {
  const todo = [
    new TodoItem("implement ShippingController", {
      tags: ["api"],
    }),
    new TodoItem("implement ReportController", {
      tags: ["api"],
    }),
    new TodoItem(
      "set up the backend routes to have more communication between frontend and backend",
      {
        status: "",
        tags: ["api"],
      }
    ),
    new TodoItem("Deploy to the test server", {
      status: "Blocked by Debian install",
      tags: ["hosting"],
    }),
    new TodoItem("Create react app with dummy data on localhost", {
      done: true,
      tags: ["react"],
    }),
  ];

  return (
    <div className="container mx-auto">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>ToDo Stratos</h1>
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
        <div>
          {todo.map((item) => (
            <TodoRender key={item.title} item={item} />
          ))}
        </div>
      </main>

      <footer className="border-t">&copy; 2021 AppDev</footer>
    </div>
  );
}
