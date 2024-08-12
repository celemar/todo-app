"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function BackgroundImage() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="absolute top-0 left-0 w-full min-h-[220px] max-h-[300px] md:min-h-[300px] md:max-h-[500px] z-[-10]">
      <Image
        src={
          resolvedTheme === "dark"
            ? "/bg-desktop-dark.jpg"
            : "/bg-desktop-light.jpg"
        }
        alt="Background"
        fill
        sizes="(min-width: 768px) 100vw, 0vw"
        className="object-cover hidden md:block"
        priority
      />
      <Image
        src={
          resolvedTheme === "dark"
            ? "/bg-mobile-dark.jpg"
            : "/bg-mobile-light.jpg"
        }
        alt="Background"
        fill
        sizes="(max-width: 767px) 100vw, 0vw"
        className="object-cover block md:hidden"
        priority
      />
    </div>
  );
}
