import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** default max-w-7xl; tim koristi užu kolonu */
  max?: "7xl" | "5xl" | "4xl";
};

/**
 * Pun širinski hero sa clinic-bg (pozadina ide edge-to-edge, sloj preko cijelog bloka).
 */
export function PageHero({ children, max = "7xl" }: Props) {
  const maxCls =
    max === "5xl"
      ? "max-w-5xl"
      : max === "4xl"
        ? "max-w-4xl"
        : "max-w-7xl";

  return (
    <div
      className="relative isolate w-full min-w-0 overflow-hidden bg-zinc-900 pt-[5.5rem] pb-10 sm:pt-36 sm:pb-16"
      style={{
        backgroundImage: "url('/clinic-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="absolute inset-0 z-0 min-h-full w-full bg-zinc-950/78"
        aria-hidden
      />
      <div
        className={`relative z-10 mx-auto w-full ${maxCls} px-4 sm:px-6 lg:px-16`}
      >
        {children}
      </div>
    </div>
  );
}
