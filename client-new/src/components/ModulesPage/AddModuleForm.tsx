"use client";

import { Separator } from "@/components/ui/separator";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IconSpinner } from "../ui/icons";
import { useModulesContext } from "@/hooks/useModulesContext";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useState } from "react";

export default function AddModulesForm() {
  const { dispatch, isLoading } = useModulesContext();
  const { user } = useAuthContext();

  const [error, setError] = useState("");
  //const [emptyFields, setEmptyFields] = useState([])

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    console.log(event);

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const moduleNameInput = (
      event.target as HTMLFormElement
    ).elements.namedItem("moduleName") as HTMLInputElement;
    const moduleName = moduleNameInput.value;

    const email = user.email;
    const module = { moduleName, email };
    const response = await fetch("http://localhost:3001/api/modules", {
      method: "POST",
      body: JSON.stringify(module),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      //setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setError("");
      //setEmptyFields([])
      dispatch({ type: "CREATE_MODULE", payload: json });
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Add a module</h3>
        <p className="text-sm text-muted-foreground">
          Add a module here to subscribe to it!
        </p>
      </div>
      <Separator />
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="moduleName">
              Module Name
            </Label>
            <Input
              id="moduleName"
              placeholder="Enter your Module Name..."
              type="text"
              autoCapitalize="uppercase"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <IconSpinner className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
