"use client";

import {
  SignInButton,
  SignOutButton,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import React from "react";

function UserWizard() {
  const { isSignedIn } = useAuth();
  return (
    <>
      {isSignedIn ? (
        <>
          <UserButton />
          <SignOutButton />
        </>
      ) : (
        <SignInButton />
      )}
    </>
  );
}

export default UserWizard;
