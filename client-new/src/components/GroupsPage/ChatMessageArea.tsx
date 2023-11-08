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
import { useParams, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useGroupsContext } from "@/hooks/useGroupsContext";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Input } from "../ui/input";

const addMessageSchema = z.object({
  message: z.string(),
});

type AddMessasgeValues = z.infer<typeof addMessageSchema>;

declare type ChatFormProps = {
  groupId: string;
};
export function ChatForm({ groupId }: ChatFormProps) {
  const { user } = useAuthContext();
  const { messages, dispatch, isLoading } = useGroupsContext();

  const defaultValues: Partial<AddMessasgeValues> = {
    message: "",
  };

  const form = useForm<AddMessasgeValues>({
    resolver: zodResolver(addMessageSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: AddMessasgeValues) {
    console.log(groupId);
    form.resetField("message");
    // await createGroup(event.groupName, event.moduleName);
    await addMessage(data.message);
  }

  const addMessage = async (message: string) => {
    if (!user) {
      return;
    }
    const message1 = { message };
    const response = await fetch(
      "http://localhost:3001/api/groups/messages/" + groupId,
      {
        method: "POST",
        body: JSON.stringify(message1),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      //setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      dispatch({ type: "ADD_MESSAGE", payload: json });
    }
  };

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
              <FormItem>
                <FormControl>
                  <Textarea
                    tabIndex={0}
                    rows={1}
                    placeholder="Send a message."
                    className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="absolute right-0 top-4 sm:right-4">
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !form.getFieldState("message").isDirty}
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
