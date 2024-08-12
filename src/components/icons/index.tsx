export const CrossIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
    <path
      fill="#494C6B"
      d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
    />
  </svg>
);

type CheckIconProps = {
  isCompleted?: boolean;
  hoverEffect?: boolean;
};

export const CheckIcon = ({ isCompleted, hoverEffect }: CheckIconProps) => (
  <span
    className={`check-icon ${hoverEffect ? "hover-effect" : ""} ${
      isCompleted
        ? "bg-gradient-to-br from-[#57ddff] to-[#c058f3]"
        : "dark:bg-[#25273c] border dark:border-[#393a4c]"
    }
    `}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="9"
      className={`transition-opacity duration-300 opacity-0 ${
        isCompleted && hoverEffect ? "opacity-100" : ""
      } ${hoverEffect ? "z-10 hover:opacity-100" : ""} ${
        isCompleted ? "  " : ""
      }`}
    >
      <path
        fill="none"
        stroke="#FFF"
        strokeWidth="2"
        d="M1 4.304L3.696 7l6-6"
      />
    </svg>
  </span>
);
