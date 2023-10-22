import {
  ChevronDownIcon,
  CircleIcon,
  PlusIcon,
  StarIcon,
  TimerIcon,
  TrashIcon,
} from "@radix-ui/react-icons";

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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";

export function ModulePostCard() {
  return (
    <Card>
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>Post Name</CardTitle>
          <CardDescription>
            Posted by <span className=" font-semibold">ZiJian</span> (
            <span className=" italic">xiezijian1999@gmail.com</span>)
          </CardDescription>
        </div>
        <Button variant="secondary" className="px-3 shadow-none">
          <TrashIcon className="mr-2 h-4 w-4" />
          Delete
        </Button>
        {/* <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
          <Button variant="secondary" className="px-3 shadow-none">
            <TrashIcon className="mr-2 h-4 w-4" />
            Delete
          </Button>
          <Separator orientation="vertical" className="h-[20px]" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="px-2 shadow-none">
                <ChevronDownIcon className="h-4 w-4 text-secondary-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              alignOffset={-5}
              className="w-[200px]"
              forceMount
            >
              <DropdownMenuLabel>Suggested Lists</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Future Ideas
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>My Stack</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Inspiration</DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PlusIcon className="mr-2 h-4 w-4" /> Create List
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <TimerIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
            Created on 2023-09-20T07:42:45.171Z
          </div>
          <div>6 days ago</div>
        </div>
      </CardContent>
      <Separator className="mb-4" />
      <CardFooter>
        <div className="space-y-2 min-w-full">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/02.png" />
              <AvatarFallback>zijian</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">XieZiJian</p>
              <p className="text-sm text-muted-foreground">
                xiezijian1999@gmail.com
              </p>
            </div>
          </div>
          <div>Help me please</div>
          <p className=" text-sm italic text-muted-foreground">6 days ago</p>
          <Separator className="w-full" />
        </div>
      </CardFooter>
      <div className="flex flex-row px-6 pb-4 space-x-4">
        <Input placeholder="Enter your comment..."></Input>
        <Button>Post</Button>
      </div>
    </Card>
  );
}
