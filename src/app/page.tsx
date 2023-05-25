import { TodoItem } from "@/components/TodoItem";
import { prisma } from "@/db";
import Link from "next/link";

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, checked: boolean) {
  "use server";

  await prisma.todo.update({ where: { id }, data: { completed: checked } });
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <>
      <header className="flex justify-between items-center pb-4 mb-4 border-b border-slate-300">
        <h1 className="text-2xl">Todos</h1>
        <Link
          className="px-2 py-1 border border-slate-300 text-slate-300 rounded-md hover:bg-slate-700 outline-none hover:text-slate-100"
          href="/new"
        >
          New
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  );
}
