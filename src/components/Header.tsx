import ThemeSwitch from "./ThemeSwitch";
import BackgroundImage from "./BackgroundImage";

export default function Header() {
  return (
    <header className="relative">
      <BackgroundImage />

      <div className="relative pt-14 md:pt-[4.875rem] pb-10 md:pb-12 flex justify-between items-center max-w-[580px] mx-auto px-5">
        <h1 className="text-[2.5rem] font-bold tracking-[1rem] text-white leading-5">
          TODO
        </h1>
        <div className="flex mb-">
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
