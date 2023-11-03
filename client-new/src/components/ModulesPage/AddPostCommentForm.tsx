"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAuthContext } from "@/hooks/useAuthContext";
import { ModulePost } from "./ModulePostCard";
import { useParams } from "next/navigation";
import { useModulesContext } from "@/hooks/useModulesContext";

const addCommentSchema = z.object({
  commentBody: z.string().min(1, {
    message: "Please enter your comment.",
  }),
});

type AddCommentValues = z.infer<typeof addCommentSchema>;

declare interface AddCommentProps {
  modulePostInfo: ModulePost;
  updateFlag: any;
}

export default function AddCommentForm({
  modulePostInfo,
  updateFlag,
}: AddCommentProps) {
  const { user } = useAuthContext();
  const { dispatch } = useModulesContext();
  const params = useParams();
  const form = useForm<AddCommentValues>({
    resolver: zodResolver(addCommentSchema),
  });

  async function onSubmit(data: AddCommentValues) {
    if (!user) {
      return;
    }
    const comment = data.commentBody;
    const body = { comment };
    const response = await fetch(
      "http://localhost:3001/api/module/" +
        params.id +
        "/" +
        modulePostInfo._id,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      updateFlag(true);
      dispatch({ type: "ADD_COMMENT", payload: json });
      form.reset({ commentBody: "" });
    } else {
    }
    console.log(json);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-row px-6 pb-4 space-x-4"
      >
        <FormField
          control={form.control}
          name="commentBody"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Enter your comment"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Post</Button>
      </form>
    </Form>
  );
}
