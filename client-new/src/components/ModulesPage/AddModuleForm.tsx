"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import { IconSpinner } from "../ui/icons";
import { useModulesContext } from "@/hooks/useModulesContext";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { toast } from "../ui/use-toast";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

const modulesList = [
  { label: "dd", value: "dd" },
  { label: "CC0002", value: "CC0002" },
  { label: "CC0003", value: "CC0003" },
  { label: "CC0004", value: "CC0004" },
  { label: "CC0005", value: "CC0005" },
  { label: "SC2005", value: "SC2005" },
  { label: "SC2006", value: "SC2006" },
  { label: "CZ4005", value: "CZ4005" },
  { label: "CZ4020", value: "CZ4020" },
] as const;

const addModuleFormSchema = z.object({
  module: z.string({
    required_error: "Please select a module.",
  }),
});

type AddModuleFormValues = z.infer<typeof addModuleFormSchema>;

export default function AddModulesDialog() {
  const { dispatch, isLoading } = useModulesContext();
  const { user } = useAuthContext();

  const [popoverOpened, setPopoverOpened] = useState(false);
  const [dialogOpened, setDialogOpened] = useState(false);
  const [error, setError] = useState("");

  const defaultValues: Partial<AddModuleFormValues> = {
    module: "",
  };
  const form = useForm<AddModuleFormValues>({
    resolver: zodResolver(addModuleFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function sendRequest(name: string) {
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const email = user.email;
    const module = { name, email };

    console.log(JSON.stringify(module));
    const response = await fetch("http://localhost:3001/api/modules", {
      method: "POST",
      body: JSON.stringify(module),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      setError("");
      setDialogOpened(false);
      form.resetField("module");
      dispatch({ type: "CREATE_MODULE", payload: json });
    } else {
      setError(json.error);
    }
  }

  async function onSubmit(data: AddModuleFormValues) {
    await sendRequest(data.module);

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    console.log(data.module);
  }

  return (
    <Dialog open={dialogOpened} onOpenChange={setDialogOpened}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          Add Module
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Add a module</h3>
            <p className="text-sm text-muted-foreground">
              Add a module here to subscribe to it!
            </p>
          </div>
          <Separator />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="module"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Module Name</FormLabel>
                    <Popover
                      open={popoverOpened}
                      onOpenChange={setPopoverOpened}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? modulesList.find(
                                  (module) => module.value === field.value
                                )?.label
                              : "Select module"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search modules..." />
                          <CommandEmpty>No modules found.</CommandEmpty>
                          <CommandGroup>
                            {modulesList.map((module) => (
                              <CommandItem
                                value={module.label}
                                key={module.value}
                                onSelect={() => {
                                  setPopoverOpened(false);
                                  form.setValue("module", module.value);
                                }}
                              >
                                <CheckIcon
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    module.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {module.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Select the Module Name for the module you wish to add.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <IconSpinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
