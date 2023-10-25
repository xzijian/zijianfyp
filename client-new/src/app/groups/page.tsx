import { AddGroupForm } from "@/components/GroupsPage/AddGroupForm";
import { GroupCard } from "@/components/GroupsPage/GroupCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { DialogDescription } from "@radix-ui/react-dialog";
import { PlusCircledIcon } from "@radix-ui/react-icons";

export default function GroupsPage() {
  return (
    <div className="hidden space-y-6 p-10 pb-16 md:block">
      <div className="space-y-0.5 flex items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Groups</h2>
          <p className="text-muted-foreground">All about your groups :&#x29;</p>
        </div>
        <div className="ml-auto">
          <Dialog>
            <DialogTrigger>
              <Button>
                <PlusCircledIcon className="mr-2 h-4 w-4" />
                Create Group
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <h2 className="text-xl font-bold tracking-tight">
                  Create a Group
                </h2>
                <p className="text-muted-foreground text-sm">
                  Add your friends and groupmates into a group here!
                </p>
                <Separator className="my-6" />
              </DialogHeader>
              <AddGroupForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className=" w-1/2 space-y-8">
          <GroupCard />
          <GroupCard />
        </aside>
        <div className="w-1/2 space-y-8">
          <GroupCard />
          <GroupCard />
        </div>
      </div>
    </div>
  );
}
