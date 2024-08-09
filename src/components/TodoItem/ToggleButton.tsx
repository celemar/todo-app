import { CheckIcon } from "../icons";

type ToggleButtonProps = {
  id: number;
  isCompleted: boolean;
  onToggleTodo: (id: number) => void;
};

export default function ToggleButton({
  id,
  isCompleted,
  onToggleTodo,
}: ToggleButtonProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
    if (e.key === " " || e.key === "Enter") {
      onToggleTodo(id);
    }
  };

  return (
    <button
      className={`flex items-center ml-6 focusable
                `}
      onClick={(e) => {
        e.stopPropagation();
        onToggleTodo(id);
      }}
      onKeyDown={handleKeyDown}
      aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
    >
      <CheckIcon isCompleted={isCompleted} hoverEffect={true} />
    </button>
  );
}
