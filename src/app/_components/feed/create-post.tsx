import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function CreatePost() {
  return (
    <section className="flex h-fit flex-col gap-4  border p-4">
      <div className="">
        <Avatar className="h-8 w-8 hover:cursor-pointer md:h-10 md:w-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </section>
  );
}

export default CreatePost;
