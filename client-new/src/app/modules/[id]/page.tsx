import { ModulePostCard } from "@/components/ModulesPage/ModulePostCard";
import { StudentsCard } from "@/components/ModulesPage/StudentsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

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
        <Input
          className="max-w-5xl flex-1"
          placeholder="Search Posts..."
        ></Input>
        <Button className=" w-80">Create New Post</Button>
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
