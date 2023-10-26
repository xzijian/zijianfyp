import {
  ChevronDownIcon,
  CircleIcon,
  FaceIcon,
  InfoCircledIcon,
  PlusIcon,
  ShadowIcon,
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
import { IconMessage } from "../ui/icons";
import AddCommentForm from "./AddPostCommentForm";
import { ScrollArea } from "../ui/scroll-area";

export declare interface PostComment {
  _id: string;
  cauthor: string;
  createdAt: string;
  comment: string;
}

export declare interface ModulePost {
  _id: string;
  author: string;
  authoremail: string;
  post: string;
  createdAt: string;
  comments: PostComment[];
}

declare interface ModulePostCardProp {
  modulePostData: ModulePost;
  updateFlag: any;
}

export function ModulePostCard({
  modulePostData,
  updateFlag,
}: ModulePostCardProp) {
  return (
    <Card>
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>{modulePostData.post}</CardTitle>
          <CardDescription>
            Posted by{" "}
            <span className=" font-semibold">{modulePostData.author}</span> (
            <span className=" italic">{modulePostData.authoremail}</span>)
          </CardDescription>
        </div>
        <Button variant="secondary" className="px-3 shadow-none">
          <TrashIcon className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <TimerIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
            Created on {modulePostData.createdAt}
          </div>
          <div>6 days ago</div>
        </div>
      </CardContent>
      <Separator className="mb-4" />
      <CardFooter>
        <ScrollArea className="max-h-[300px] flex flex-col space-y-2 w-full">
          {modulePostData.comments.length > 0 ? (
            modulePostData &&
            modulePostData.comments.map((comment) => (
              <div
                key={comment._id}
                className="pt-4 space-y-2 min-w-full max-w-full"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/02.png" />
                    <AvatarFallback>zijian</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {comment.cauthor}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      xiezijian1999@gmail.com
                    </p>
                  </div>
                </div>
                <div>{comment.comment}</div>
                <p className=" text-sm italic text-muted-foreground">
                  6 days ago
                </p>
                <Separator className="w-full" />
              </div>
            ))
          ) : (
            <p className=" py-2 text-sm text-muted-foreground text-center">
              <InfoCircledIcon className="w-4 h-4 mx-auto mb-2" />
              No comments yet...
            </p>
          )}
        </ScrollArea>
      </CardFooter>
      {/* <div className="flex flex-row px-6 pb-4 space-x-4">
        <Input placeholder="Enter your comment..."></Input>
        <Button>Post</Button>
      </div> */}
      <AddCommentForm modulePostInfo={modulePostData} updateFlag={updateFlag} />
    </Card>
  );
}
