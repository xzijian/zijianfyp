"use client";

import ChatHistory, { Message } from "@/components/GroupsPage/ChatHistory";
import { ChatForm } from "@/components/GroupsPage/ChatMessageArea";
import { GroupMembersCard } from "@/components/GroupsPage/GroupMembers";
import { IconMessage } from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useGroupsContext } from "@/hooks/useGroupsContext";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

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

export declare interface GroupDetail {
  _id: string;
  groupname: string;
  coursename: string;
  members: string[];
  __v: number;
  messages: Message[];
}

declare interface GroupDetailPageProp {
  groupData?: GroupDetail;
  params: { id: string; groupname: string };
}

export default function GroupDetailPage({
  groupData,
  params,
}: GroupDetailPageProp) {
  const { user } = useAuthContext();
  const { groups, messages, dispatch } = useGroupsContext();
  const searchParams = useSearchParams();
  const groupName = searchParams.get("nm");

  const fetchMessages = async () => {
    if (!user) return;
    const response = await fetch(
      "http://localhost:3001/api/groups/messages/" + params.id,
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "SET_MESSAGES", payload: json });
      // console.log(json);
    }
  };

  useEffect(() => {
    fetchMessages();
    console.log(params.groupname);
  }, [dispatch, user]);

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{groupName}</h2>
          <p className="text-muted-foreground">Whats going on in this group?</p>
        </div>
      </div>
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 justify-between">
        <aside className="w-[22rem]">
          <GroupMembersCard />
        </aside>
        <div className="flex-1 lg:max-w-4xl">
          <div className="flex flex-col justify-between lg:max-h-[710px] min-h-[710px]  border border-muted shadow-md rounded-md p-4">
            <div>
              <ScrollToBottom
                initialScrollBehavior="auto"
                className="h-[600px]"
              >
                {messages && messages.length > 0 ? (
                  messages.map((message, index) => (
                    <div key={index}>
                      <ChatHistory message={message} />
                      {index < messages.length - 1 && (
                        <Separator className="my-4 md:my-8" />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col align-middle justify-center items-center pt-60">
                    <IconMessage className="w-8 h-8 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Be the first to send a message!
                    </p>
                  </div>
                )}
              </ScrollToBottom>
            </div>
            <div>
              <ChatForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
