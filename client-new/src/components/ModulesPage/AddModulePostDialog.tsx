"use client";

import { Separator } from "@/components/ui/separator";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IconSpinner } from "../ui/icons";
import { useModulesContext } from "@/hooks/useModulesContext";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
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
import { useParams } from "next/navigation";

const addCommentSchema = z.object({
  post: z.string({
    required_error: "Please enter your post.",
  }),
});
type AddCommentValues = z.infer<typeof addCommentSchema>;

declare interface AddPostFormProps {
  updateFlag: any;
}

export default function AddModulePostDialog({ updateFlag }: AddPostFormProps) {
  const { dispatch, isLoading } = useModulesContext();
  const { user } = useAuthContext();
  const params = useParams();

  const [dialogOpened, setDialogOpened] = useState(false);
  const [error, setError] = useState("");
  //const [emptyFields, setEmptyFields] = useState([])

  const form = useForm<AddCommentValues>({
    resolver: zodResolver(addCommentSchema),
  });

  async function onSubmit(data: AddCommentValues) {
    if (!user) {
      setError("You must be logged in");
      return;
    }
    const post = data.post;
    const jsonPost = { post };
    const response = await fetch(
      "http://localhost:3001/api/module/" + params.id,
      {
        method: "POST",
        body: JSON.stringify(jsonPost),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const res = await response.json();

    if (response.ok) {
      setDialogOpened(false);
      form.resetField("post");
      dispatch({ type: "ADD_POST", payload: res });
      updateFlag(true);
    } else {
      setError(res.error);
      //setEmptyFields(json.emptyFields)
    }
  }

  return (
    <Dialog open={dialogOpened} onOpenChange={setDialogOpened}>
      <DialogTrigger>
        <Button className=" w-80">Create New Post</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Create post</h3>
            <p className="text-sm text-muted-foreground">
              Add a post in this module!
            </p>
          </div>
          <Separator />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="post"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel>Enter your Post</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="What is tested during finals?"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      What do you want to write about?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isLoading} type="submit">
                {isLoading && (
                  <IconSpinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Post
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
