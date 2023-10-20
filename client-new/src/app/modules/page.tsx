"use client";

import { useEffect } from "react";
import { useModulesContext } from "@/hooks/useModulesContext";
import { useAuthContext } from "@/hooks/useAuthContext";
import { ModuleTable } from "@/components/ModulesPage/ModuleTable";

export default function TaskPage() {
  const { modules, dispatch } = useModulesContext();
  const { user } = useAuthContext();

  // const tasks = await getTasks();
  useEffect(() => {
    const fetchModules = async () => {
      const response = await fetch("http://localhost:3001/api/modules", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_MODULE", payload: json });
      }
    };

    if (user) {
      fetchModules();
    }
  }, [dispatch, user]);

  console.log(modules);

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">My Modules</h2>
            <p className="text-muted-foreground">
              Here&apos;s your list of modules!
            </p>
          </div>
        </div>
        <ModuleTable />
      </div>
    </>
  );
}
