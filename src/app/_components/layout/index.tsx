import type { PropsWithChildren } from "react";
import Header from "../Header";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="relative mx-auto flex max-w-6xl flex-col justify-center gap-4">
      <Header />
      <main className="flex justify-center">{children}</main>
    </div>
  );
}
