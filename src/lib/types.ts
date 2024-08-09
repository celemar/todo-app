export type Todo = {
  id: number;
  text: string;
  isCompleted: boolean;
};

export type Filter = "all" | "active" | "completed";

export type TodoItemProps = {
  id: any;
  text: string;
  isCompleted: boolean;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

