import { PropsWithChildren } from "react";

export function Badge(props: PropsWithChildren<{ color?: string }>) {
  const color = props.color ?? "bg-red-600";
  return (
    <div
      className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 ${color} rounded-full`}
    >
      {props.children}
    </div>
  );
}
