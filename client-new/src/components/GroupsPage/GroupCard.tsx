import {
  ChevronDownIcon,
  FaceIcon,
  GitHubLogoIcon,
  HeadingIcon,
} from "@radix-ui/react-icons";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import Link from "next/link";
import { IconSun, IconUser } from "../ui/icons";
import { GroupDetail } from "@/app/groups/[id]/page";
import { redirect, useRouter } from "next/navigation";

declare interface GroupCardProp {
  groupData: GroupDetail;
}

export function GroupCard({ groupData }: GroupCardProp) {
  const { push } = useRouter();
  const handleRedirect = () => {
    push("groups/" + groupData._id + "?nm=" + groupData.groupname);
  };
  return (
    // <Link href="/groups/abc">
    <Card
      className="transition-all ease-in hover:scale-105 hover:shadow-md cursor-pointer"
      onClick={handleRedirect}
    >
      <CardHeader>
        <CardTitle>{groupData.groupname}</CardTitle>
        <CardDescription>{groupData.coursename}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {groupData.members &&
          groupData.members.map((member, index) => (
            <div
              className="flex items-center justify-between space-x-4"
              key={index}
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>{member.slice(0, 7)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    Sofia Davis
                  </p>
                  <p className="text-sm text-muted-foreground">{member}</p>
                </div>
              </div>
              {index == 0 ? (
                <Button variant="outline" disabled className="ml-auto w-32">
                  <FaceIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  Owner
                </Button>
              ) : (
                <Button variant="outline" disabled className="ml-auto w-32">
                  <IconUser className="mr-2 h-4 w-4 text-muted-foreground" />
                  Member
                </Button>
              )}
            </div>
          ))}
      </CardContent>
    </Card>
    // </Link>
  );
}
