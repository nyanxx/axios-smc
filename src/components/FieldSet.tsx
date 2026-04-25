// Great refrence of compound component pattern

import { twMerge } from "tailwind-merge";
import type { HTMLAttributes } from "react";

function FieldSet({
  children,
  className,
  ...props
}: { children: React.ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      style={{
        position: "relative",
        borderStyle: "var(--tw-border-style)",
        borderWidth: "2px",
        borderColor: "#ccc",
        // padding: "1rem",
      }}
      className={twMerge(`bg-[#fafafa] p-4 pt-8 mt-13  ${className ?? ""}`)}
      {...props}
    >
      {children}
    </section>
  );
}

function Title({
  children,
  className,
  ...props
}: { children: React.ReactNode } & HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={twMerge(
        `absolute overflow-hidden text-nowrap -top-3.5 rounded-lg border-t border-l border-r border-[#ccc]  bg-[#fafafa] inline-block px-4 font-bold ${className ?? ""}`,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

FieldSet.Title = Title;

export default FieldSet;

{
  /*
Usage: 

<FieldSet>
  <FieldSet.Title>
    Parallel Fetching (<em>See Console</em>)
  </FieldSet.Title>
  <ParallelFetchingWithPromiseAll />
  <ParallelFetchingWithAxiosAll />
</FieldSet>; 

*/
}
