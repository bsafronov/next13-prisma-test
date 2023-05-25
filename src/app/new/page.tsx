import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function createTodo(data: FormData) {
  "use server";
  const title = data.get("title")?.valueOf();

  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid title");
  }
  await prisma.todo.create({ data: { title, completed: false } });
  redirect("/");
}

export default function Page() {
  return (
    <>
      <header className="mb-2">
        <h1 className="text-2xl">Create new todo</h1>
      </header>
      <form action={createTodo} className="flex flex-col gap-4 max-w-sm">
        <input
          type="text"
          name="title"
          className="bg-transparent border border-slate-300 rounded-md outline-none px-2 py-1"
        />
        <div className="flex gap-2 items-center justify-end">
          <Link
            className="px-2 py-1 border border-slate-300 text-slate-300 rounded-md hover:bg-slate-700 outline-none hover:text-slate-100"
            href=".."
          >
            Go back
          </Link>
          <button
            type="submit"
            className="px-2 py-1 border border-slate-300 text-slate-300 rounded-md hover:bg-slate-700 outline-none hover:text-slate-100"
          >
            Accept
          </button>
        </div>
      </form>
    </>
  );
}
