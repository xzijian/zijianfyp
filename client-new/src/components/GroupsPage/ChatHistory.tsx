import { cn } from "@/lib/utils";
import { IconMemberChat, IconOpenAI, IconUser } from "../ui/icons";
import { Separator } from "@/components/ui/separator";

export interface Message {
  role: String;
  name: String;
  time: String;
  content: string;
}

export interface ChatMessageProps {
  message: Message;
}

export default function ChatHistory({ message }: ChatMessageProps) {
  console.log(message);
  return (
    <div className={cn(" relative mb-4 flex items-start ")}>
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 select-none items-center justify-center rounded-md border shadow",
          message.role === "user"
            ? "bg-gray-100"
            : "bg-primary text-primary-foreground"
        )}
      >
        {message.role === "user" ? (
          <IconMemberChat name="zijian" />
        ) : (
          <IconMemberChat name="marqus" />
        )}
      </div>
      <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden">
        <p className="font-semibold">
          {message.name}{" "}
          <span className=" text-muted-foreground font-light italic text-sm">
            - {message.time}
          </span>
        </p>
        <p className="mb-2 last:mb-0">{message.content}</p>
      </div>
    </div>
  );
}
