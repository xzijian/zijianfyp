import AddModulePostDialog from "@/components/ModulesPage/AddModulePostDialog";
import { ModulePostCard } from "@/components/ModulesPage/ModulePostCard";
import { StudentsCard } from "@/components/ModulesPage/StudentsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CrossCircledIcon } from "@radix-ui/react-icons";

export default function ModuleDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Module Name here
          </h2>
          <p className="text-muted-foreground">
            Whats going on in this module?
          </p>
        </div>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-row justify-between space-x-12">
        <div className="flex flex-row space-x-10 w-full">
          <Input className="flex-1" placeholder="Search Posts..." />
          <Button variant="outline">
            <CrossCircledIcon className="w-6 h-6 pr-2" />
            Clear Filters
          </Button>
        </div>
        <AddModulePostDialog />
      </div>
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 justify-between">
        <div className="flex-1 lg:max-w-5xl space-y-6">
          <ModulePostCard />
          <ModulePostCard />
          <ModulePostCard />
          <ModulePostCard />
        </div>
        <aside className="w-80">
          <StudentsCard />
        </aside>
      </div>
    </div>
  );
}
