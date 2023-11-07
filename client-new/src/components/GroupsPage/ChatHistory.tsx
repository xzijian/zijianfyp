import { cn } from "@/lib/utils";
import { IconMemberChat, IconOpenAI, IconUser } from "../ui/icons";
import { Separator } from "@/components/ui/separator";
import { useAuthContext } from "@/hooks/useAuthContext";

export declare interface Message {
  author: String;
  message: String;
  _id: String;
  createdAt: string;
}

export interface ChatMessageProps {
  message: Message;
}

export default function ChatHistory({ message }: ChatMessageProps) {
  const { user } = useAuthContext();
  return (
    <div className={cn(" relative mb-4 flex items-start")}>
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 select-none items-center justify-center rounded-md border shadow",
          message.author === "user"
            ? "bg-gray-100"
            : "bg-primary text-primary-foreground"
        )}
      >
        <IconMemberChat name={user.names} />
      </div>
      <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden">
        <p className="font-semibold">
          {message.author}{" "}
          <span className=" text-muted-foreground font-light italic text-sm">
            - {message.createdAt}
          </span>
        </p>
        <p className="mb-2 last:mb-0">{message.message}</p>
      </div>
    </div>
  );
}
