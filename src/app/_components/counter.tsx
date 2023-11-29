"use client";
import { useAppDispatch, useAppSelector } from "~/state/store";
import { Button } from "./ui/button";
import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
} from "~/state/counter/counterSlice";

export default function Counter() {
  const count = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col gap-4">
      <Button type="button" onClick={() => dispatch(increment())}>
        Increment
      </Button>
      <Button type="button" onClick={() => dispatch(incrementByAmount(10))}>
        Increment by 10
      </Button>
      <Button type="button" onClick={() => dispatch(incrementAsync(10))}>
        Increment by 10 Async
      </Button>
      <p>{count.value}</p>
      <Button type="button" onClick={() => dispatch(decrement())}>
        Decrement
      </Button>
    </div>
  );
}
