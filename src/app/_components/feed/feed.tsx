import type { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  readonly children: React.ReactNode;
};

export default function Feed({ children }: Props) {
  return (
    <main className="flex min-h-screen w-full max-w-[37.5rem] flex-col">
      {children}
    </main>
  );
}
