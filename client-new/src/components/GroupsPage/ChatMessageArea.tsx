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

// export interface PromptProps
//   extends Pick<UseChatHelpers, "input" | "setInput"> {
//   onSubmit: (value: string) => Promise<void>;
//   isLoading: boolean;
// }

export function ChatForm({ onSubmit, input, setInput, isLoading }: any) {
  //   const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!input?.trim()) {
          return;
        }
        setInput("");
        await onSubmit(input);
      }}
    >
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
        <div className="absolute top-3 left-0">
          <div className=" bg-gray-100 ml-3 rounded-md">
            <Avatar className="">
              <AvatarImage src="/avatars/01.png" />
              <AvatarFallback>zijian</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <Textarea
          ref={inputRef}
          tabIndex={0}
          //   onKeyDown={onKeyDown}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a message."
          spellCheck={false}
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
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
      </div>
    </form>
  );
}
