"use client";
import * as React from "react";
import Textarea from "react-textarea-autosize";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  IconArrowElbow,
  IconPlus,
  IconMemberChat,
} from "@/components/ui/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { z } from "zod";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../ui/form";

const addMessageSchema = z.object({
  message: z.string().min(1, { message: "Please enter a message" }),
});

type AddMessasgeValues = z.infer<typeof addMessageSchema>;

export function ChatForm({ input, setInput, isLoading }: any) {
  //   const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const defaultValues: Partial<AddMessasgeValues> = {
    message: "",
  };

  const form = useForm<AddMessasgeValues>({
    resolver: zodResolver(addMessageSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(event: AddMessasgeValues) {
    console.log(event);
    // await createGroup(event.groupName, event.moduleName);
  }

  return (
    <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
      <div className="absolute top-3 left-0">
        <div className=" bg-gray-100 ml-3 rounded-md">
          <Avatar className="">
            <AvatarImage src="/avatars/01.png" />
            <AvatarFallback>zijian</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="message"
            control={form.control}
            render={({ field }) => (
              <Textarea
                tabIndex={0}
                //   onKeyDown={onKeyDown}
                rows={1}
                placeholder="Send a message."
                spellCheck={false}
                className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
                {...field}
              />
            )}
          />
          <div className="absolute right-0 top-4 sm:right-4">
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || input === ""}
            >
              <IconArrowElbow />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
