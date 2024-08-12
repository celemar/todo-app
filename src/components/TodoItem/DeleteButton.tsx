import { CrossIcon } from "../icons";

type DeleteButtonProps = {
  onDelete: (id: number) => void;
  id: number;
};

export default function DeleteButton({onDelete, id}: DeleteButtonProps) {

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.stopPropagation();
    }
    if (e.key === " " || e.key === "Enter") { 
      onDelete(id);
    }
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onDelete(id);
      }}
      aria-label="Delete item"
      onKeyDown={handleKeyDown}
      className="delete-button mr-6 focusable focus:opacity-100 opacity-0 transition-opacity duration-300 ease-in-out"
    >
      <CrossIcon />
    </button>
  );
};
