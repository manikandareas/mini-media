"use client";
import { useSession } from "next-auth/react";
import React from "react";

export default function UserWizard() {
  const { data } = useSession();
  return <div>{data?.user ? data?.user?.name : "Not logged in"}</div>;
}
