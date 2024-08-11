"use client";

import React, { useEffect, useState } from "react";
import AddTodoForm from "./AddTodoForm";
import { Filter, Todo } from "@/lib/types";
import { CheckIcon } from "./icons";

import {
  closestCorners,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import TodoItem from "./TodoItem/TodoItem";

export default function TodoList() {
  const defaultTodos: Todo[] = [
    { id: 1, text: "Complete online JavaScript course", isCompleted: false },
    { id: 2, text: "Jog around the park 3x", isCompleted: false },
    { id: 3, text: "10 minutes meditation", isCompleted: false },
    { id: 4, text: "Read for 1 hour", isCompleted: false },
    { id: 5, text: "Pick up groceries", isCompleted: false },
    { id: 6, text: "Complete Todo App on Frontend Mentor", isCompleted: false }
  ];
  
  const getStoredTodos = (): Todo[] => {
    const hasInitialized = localStorage.getItem("initialized");
    if (!hasInitialized) {
      localStorage.setItem("todos", JSON.stringify(defaultTodos));
      localStorage.setItem("initialized", "true");
      return defaultTodos;
    }
    const storedTodos = localStorage.getItem("todos");
    if (!storedTodos) {
      return [];
    }

    try {
      const parsedTodos = JSON.parse(storedTodos);
      if (Array.isArray(parsedTodos)) {
        return parsedTodos;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  };

  //state
  const [todos, setTodos] = useState<Todo[]>(getStoredTodos);
  const [filter, setFilter] = useState<Filter>("all");

  //side effects
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  //event handlers
  const addTodo = (newTodo: string) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: Date.now(),
        text: newTodo,
        isCompleted: false,
      },
    ]);
  };

  const clearCompletedTodos = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.isCompleted));
  };

  const filteredTodos: Todo[] = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.isCompleted;
    if (filter === "completed") return todo.isCompleted;
    return true;
  });

  // DND Kit
  const getTodoPosition = (id: UniqueIdentifier) =>
    todos.findIndex((todo) => todo.id === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!active || !over) return;
    if (active.id === over.id) return;

    setTodos((prevTodos) => {
      const originalPosition = getTodoPosition(active.id);
      const newPosition = getTodoPosition(over.id);

      return arrayMove(prevTodos, originalPosition, newPosition);
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 6,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Nav
  function PrimaryNav() {
    return (
      <nav>
        <ul
          className="flex text-sm py-[17px] text-[#9394a5] dark:text-[#777a92] relative
        justify-between"
        >
          <li className="ml-6 focusable" tabIndex={0}>
            {`${todos.filter((todo) => !todo.isCompleted).length} 
            ${todos.filter((todo) => !todo.isCompleted).length === 1 
                ? "item"
                : "items"
            } left`}
          </li>
          <div
            className="flex gap-4 
        absolute bottom-[-130%] left-50 py-4 rounded bg-[#fff] dark:bg-[#25273c] w-full justify-center
        md:static md:bottom-auto md:left-auto md:py-0 md:w-auto font-bold shadow-lg md:shadow-none md:items-center"
          >
            <li
              className={`${
                filter === "all"
                  ? "text-[#3a7bfd]"
                  : "hover:text-[#484b6a] dark:hover:text-[#e4e5f1] text-[#777a92]"
              }`}
            >
              <button className="focusable" onClick={() => setFilter("all")}>
                All
              </button>
            </li>
            <li
              className={`${
                filter === "active"
                  ? "text-[#3a7bfd]"
                  : "hover:text-[#484b6a] dark:hover:text-[#e4e5f1] text-[#777a92]"
              }`}
            >
              <button className="focusable" onClick={() => setFilter("active")}>
                Active
              </button>
            </li>
            <li
              className={`${
                filter === "completed"
                  ? "text-[#4b7ae2]"
                  : "hover:text-[#484b6a] dark:hover:text-[#d6d9e8] text-[#777a92]"
              }`}
            >
              <button
                className="focusable"
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
            </li>
          </div>

          <li className="mr-6 hover:text-[#484b6a] dark:hover:text-[#d6d9e8]">
            <button className="focusable" onClick={clearCompletedTodos}>
              Clear Completed
            </button>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <div className="max-w-[589px] mx-auto px-6">
      <div className="relative">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-6">
          <CheckIcon />
        </div>

        <AddTodoForm onAddTodo={addTodo} />
      </div>

      <div className="rounded dark:bg-[#25273c] bg-[#ffffff] mt-4 md:mt-6 shadow-lg">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <ul>
            <SortableContext
              items={todos}
              strategy={verticalListSortingStrategy}
            >
              {filteredTodos.length > 0 &&
                filteredTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    id={todo.id}
                    text={todo.text}
                    isCompleted={todo.isCompleted}
                    setTodos={setTodos}
                  />
                ))}
            </SortableContext>
          </ul>
        </DndContext>

        <PrimaryNav />
      </div>
    </div>
  );
}
