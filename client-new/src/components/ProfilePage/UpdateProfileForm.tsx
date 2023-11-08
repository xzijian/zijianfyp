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
import { IconSpinner } from "../ui/icons";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { useProfile } from "@/hooks/useProfile";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  course: z.string().max(3, {
    message: "Please enter only the abbrevation. E.g. Computer Science -> CS",
  }),
  year: z.string(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const { user } = useAuthContext();
  const { updateProfile, error, isLoading } = useProfile();
  const defaultValues: Partial<ProfileFormValues> = {
    name: user?.names,
    course: user?.course,
    year: user?.year,
  };
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });
  async function onSubmit(event: ProfileFormValues) {
    console.log(event);
    await updateProfile(user.email, event.name, event.course, event.year);
    // if (!user) {
    //   setError("You must be logged in");
    //   return;
    // }

    // const moduleNameInput = (
    //   event.target as HTMLFormElement
    // ).elements.namedItem("moduleName") as HTMLInputElement;
    // const moduleName = moduleNameInput.value;

    // const email = user.email;
    // const module = { moduleName, email };
    // const response = await fetch("http://localhost:3001/api/modules", {
    //   method: "POST",
    //   body: JSON.stringify(module),
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${user.token}`,
    //   },
    // });
    // const json = await response.json();

    // if (!response.ok) {
    //   setError(json.error);
    //   //setEmptyFields(json.emptyFields)
    // }
    // if (response.ok) {
    //   setError("");
    //   //setEmptyFields([])
    //   dispatch({ type: "CREATE_MODULE", payload: json });
    // }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="course"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your course. Enter the abbrevation of your course.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="year"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>Enter the year of your study!</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {isLoading && <IconSpinner className="mr-2 h-4 w-4 animate-spin" />}
          Update Profile
        </Button>
      </form>
    </Form>
  );
}
