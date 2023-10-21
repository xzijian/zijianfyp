"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { toast } from "@/components/ui/use-toast"
import { useModulesContext } from "@/hooks/useModulesContext";
import { useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Label } from "../ui/label";
import { Icons } from "../ui/icons";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { useProfile } from "@/hooks/useProfile";

const profileFormSchema = z.object({
  groupName: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  moduleName: z.string().max(6, {
    message: "Enter 6 characters module code",
  }),
  members: z.array(z.object({ value: z.string() })),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function AddGroupForm() {
  const { user } = useAuthContext();
  const { updateProfile, error, isLoading } = useProfile();

  const defaultValues: Partial<ProfileFormValues> = {
    members: [{ value: user.email }],
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    name: "members",
    control: form.control,
  });
  async function onSubmit(event: ProfileFormValues) {
    console.log(event);
    // await updateProfile(user.email, event.name, event.course, event.year);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="groupName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group Name</FormLabel>
              <FormControl>
                <Input placeholder="Team 4" {...field} />
              </FormControl>
              <FormDescription>
                This is your group name. Consider including group number for
                ease of identification.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="moduleName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Module Code</FormLabel>
              <FormControl>
                <Input placeholder="CC0001" {...field} />
              </FormControl>
              <FormDescription>
                This is the module code for the group you are creating!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`members.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Members
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add members to the group by entering their email address!
                  </FormDescription>
                  <FormControl>
                    <Input {...field} disabled={index === 0} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            Add Member
          </Button>
        </div>
        <Button type="submit">
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Create Group
        </Button>
      </form>
    </Form>
  );
}
