import { TodoItemProps } from "@/lib/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DeleteButton from "./DeleteButton";
import ToggleButton from "./ToggleButton";

export default function TodoItem({
  setTodos,
  id,
  text,
  isCompleted,
}: TodoItemProps) {
  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };
  
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      role="listitem"
      className="flex justify-between items-center py-4 md:py-5 border-b dark:border-[#393a4c] touch-none focusable text-sm md:text-base"
    >
      <div className="flex gap-6">
        <ToggleButton
          id={id}
          isCompleted={isCompleted}
          onToggleTodo={toggleTodo}
        />
        <p
          className={`${
            isCompleted
              ? "line-through text-[#d2d3db] dark:text-[#9394a5]"
              : "text-[#777a92] dark:text-[#C8CBE7]"
          } text-base md:text-lg cursor-pointer flex items-center  hover:text-[#777a92] focusable`}
        >
          {text}
        </p>
      </div>

      <DeleteButton id={id} onDelete={() => deleteTodo(id)}  />
    </li>
  );
}
