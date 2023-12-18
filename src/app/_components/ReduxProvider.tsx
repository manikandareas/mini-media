"use client";
import type { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from "~/state/store";

export default function ReduxProvider({ children }: PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}
