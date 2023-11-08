"use client";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IconMemberChat } from "../ui/icons";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useGroupsContext } from "@/hooks/useGroupsContext";
import { GroupDetail } from "@/app/groups/[id]/page";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/hooks/useAuthContext";

declare interface GroupMembersCardProp {
  groupData?: GroupDetail;
}

export function GroupMembersCard({ groupData }: GroupMembersCardProp) {
  const { user } = useAuthContext();
  const { dispatch } = useGroupsContext();
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMember, setNewMember] = useState("");
  const handleAddMemberField = () => {
    setIsAddingMember(true);
  };
  const handleAddMember = async () => {
    console.log("here");
    if (!user) {
      return;
    }
    const group = { newMember };
    const response = await fetch(
      "http://localhost:3001/api/groups/" + groupData?._id,
      {
        method: "POST",
        body: JSON.stringify(group),
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
      dispatch({ type: "ADD_MEMBER", payload: json });
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Members</CardTitle>
        <CardDescription>All students in this group!</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {groupData?.members &&
          groupData.members.map((member) => (
            <div
              className="flex items-center justify-between space-x-4"
              key={member}
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>
                    {member.split("@")[0].substring(0, 7)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {member.split("@")[0]}
                  </p>
                  <p className="text-sm text-muted-foreground">{member}</p>
                </div>
              </div>
            </div>
          ))}
      </CardContent>
      <CardFooter>
        {isAddingMember ? (
          <div className="flex items-center space-x-4">
            <Input
              type="text"
              placeholder="Enter new member's name"
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
            />
            <Button onClick={handleAddMember}>Submit</Button>
          </div>
        ) : (
          <Button
            variant="outline"
            className="w-full hover:text-white hover:bg-primary hover:border-white"
            onClick={handleAddMemberField}
          >
            Add Member
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
