"use client";

import AddModulePostDialog from "@/components/ModulesPage/AddModulePostDialog";
import {
  ModulePost,
  ModulePostCard,
} from "@/components/ModulesPage/ModulePostCard";
import { StudentsCard } from "@/components/ModulesPage/StudentsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useModulesContext } from "@/hooks/useModulesContext";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

export declare interface ModuleInterface {
  _id: string;
  name: string;
  students: string[];
}

export default function ModuleDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { user } = useAuthContext();
  const { posts, students, dispatch } = useModulesContext();

  const [currentModule, setCurrentModule] = useState<ModuleInterface>();
  const [filterText, setFilterText] = useState("");
  const [fetchFlag, setFetchFlag] = useState(false);

  const fetchPosts = async () => {
    const response = await fetch(
      "http://localhost:3001/api/module/" + params.id,
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    const response1 = await fetch(
      "http://localhost:3001/api/modules/" + params.id,
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    const postDataJson = await response.json();
    const moduleDataJson = await response1.json();

    if (response.ok && response1.ok) {
      const json2 = [postDataJson, moduleDataJson];
      setCurrentModule(moduleDataJson);
      dispatch({ type: "SET_POSTS", payload: json2 });
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const handleClearFilter = () => {
    setFilterText("");
  };

  useEffect(() => {
    fetchPosts();
    setFetchFlag(false);
  }, [fetchFlag]);

  const filteredPosts = posts?.filter((post: ModulePost) => {
    const postText = post.post.toLowerCase();
    const searchText = filterText.toLowerCase();
    return postText.includes(searchText);
  });

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {currentModule?.name}
          </h2>
          <p className="text-muted-foreground">
            Whats going on in this module?
          </p>
        </div>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-row justify-between space-x-12">
        <div className="flex flex-row space-x-10 w-full">
          <Input
            className="flex-1"
            placeholder="Search Posts..."
            onChange={handleFilterChange}
            value={filterText}
          />
          <Button variant="outline" onClick={handleClearFilter}>
            <CrossCircledIcon className="w-6 h-6 pr-2" />
            Clear Filters
          </Button>
        </div>
        <AddModulePostDialog updateFlag={setFetchFlag} />
      </div>
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 justify-between">
        <div className="flex-1 lg:max-w-5xl space-y-6">
          {posts &&
            filteredPosts.map((post: ModulePost) => (
              <ModulePostCard
                key={post._id}
                modulePostData={post}
                updateFlag={setFetchFlag}
              />
            ))}
        </div>
        <aside className="w-80">
          <StudentsCard students={students} />
        </aside>
      </div>
    </div>
  );
}
