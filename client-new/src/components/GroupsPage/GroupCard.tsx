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

export function GroupCard() {
  return (
    <Card className="transition-all ease-in hover:scale-105 hover:shadow-md">
      <Link href="/groups/abc">
        <CardHeader>
          <CardTitle>Group 6 ace this Healthy Living</CardTitle>
          <CardDescription>CC0005</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/avatars/01.png" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">Sofia Davis</p>
                <p className="text-sm text-muted-foreground">m@example.com</p>
              </div>
            </div>
            <Button variant="outline" disabled className="ml-auto w-32">
              <FaceIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              Owner
            </Button>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/avatars/02.png" />
                <AvatarFallback>JL</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">Jackson Lee</p>
                <p className="text-sm text-muted-foreground">p@example.com</p>
              </div>
            </div>

            <Button variant="outline" disabled className="ml-auto w-32">
              <IconUser className="mr-2 h-4 w-4 text-muted-foreground" />
              Member
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
