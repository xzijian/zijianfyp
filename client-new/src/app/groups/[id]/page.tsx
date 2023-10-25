import ChatHistory from "@/components/GroupsPage/ChatHistory";
import { ChatForm } from "@/components/GroupsPage/ChatMessageArea";
import { GroupMembersCard } from "@/components/GroupsPage/GroupMembers";
import { Separator } from "@/components/ui/separator";

const messageLog = [
  {
    role: "user",
    name: "zijian",
    time: "2 minutes ago",
    content: "Have yall done the tutorial?",
  },
  {
    role: "admin",
    name: "marqus",
    time: "a minute ago",
    content: "What do you mean you havent do...",
  },
  {
    role: "admin",
    name: "marqus",
    time: "less than a minute ago",
    content: "its due tonight",
  },
  {
    role: "user",
    name: "zijian",
    time: "less than a minute ago",
    content: "oh shucks",
  },
  {
    role: "admin",
    name: "marqus",
    time: "less than a minute ago",
    content: "Just do it now, you still have some time",
  },
];

export default function GroupDetailPage() {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Group Name here</h2>
          <p className="text-muted-foreground">Whats going on in this group?</p>
        </div>
      </div>
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 justify-between">
        <aside className="w-[22rem]">
          <GroupMembersCard />
        </aside>
        <div className="flex-1 lg:max-w-4xl space-y-6">
          {messageLog.map((message, index) => (
            <div key={index}>
              <ChatHistory message={message} />
              {index < messageLog.length - 1 && (
                <Separator className="my-4 md:my-8" />
              )}
            </div>
          ))}
          <ChatForm />
        </div>
      </div>
    </div>
  );
}
