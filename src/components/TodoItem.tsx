"use client";
import { Todo } from "@prisma/client";

interface TodoItemProps extends Todo {
  toggleTodo: (id: string, checked: boolean) => void;
}

export function TodoItem({ completed, id, title, toggleTodo }: TodoItemProps) {
  return (
    <li className="flex gap-1 items-center">
      <input
        className="peer cursor-pointer"
        id={id}
        type="checkbox"
        defaultChecked={completed}
        onChange={(e) => toggleTodo(id, e.target.checked)}
      />
      <label
        className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500"
        htmlFor={id}
      >
        {title}
      </label>
    </li>
  );
}
