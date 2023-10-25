import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { CrossCircledIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Module } from "./ModuleTable";
import { useModulesContext } from "@/hooks/useModulesContext";
import { useAuthContext } from "@/hooks/useAuthContext";

declare interface ModuleActionProps {
  clickedModule: Module;
}

export function ModuleActionButtons({ clickedModule }: ModuleActionProps) {
  const { push } = useRouter();
  const { dispatch } = useModulesContext();
  const { user } = useAuthContext();

  const handleViewClick = () => {
    push(`/modules/${clickedModule._id}`);
  };

  const handleDeleteClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(
      "http://localhost:3001/api/modules/" + clickedModule._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_MODULE", payload: json });
    }
  };

  return (
    <div className="pr-4 float-right space-x-4">
      <Button variant="outline" onClick={handleViewClick}>
        <EyeOpenIcon className="mr-2 h-4 w-4" />
        View
      </Button>
      <Button variant="destructive" onClick={handleDeleteClick}>
        <CrossCircledIcon className="mr-2 w-4 h-4" />
        Delete
      </Button>
    </div>
  );
}
