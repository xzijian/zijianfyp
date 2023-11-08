"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const registerFormSchema = z
  .object({
    email: z
      .string({ required_error: "Please enter an email." })
      .email({ message: "Enter a valid email address. (e.g. abc@xyz.com)" }),
    password: z.string({ required_error: "Please enter a password." }).min(12, {
      message: "Your password must be at least 12 characters long!",
    }),
    confirmPassword: z.string({ required_error: "Please enter a password." }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export default function SignUpForm() {
  const defaultValues: Partial<RegisterFormValues> = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues,
    mode: "onChange",
  });
  async function onSubmit(event: RegisterFormValues) {
    console.log(event);
    form.reset();
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen -mt-24 ">
      <div className="w-full m-auto bg-white lg:max-w-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">
                  Create an account
                </CardTitle>
                <CardDescription className="text-center">
                  Enter your email and password to sign up
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="abc@de.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your email address, please provide a valid email
                        address.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          autoComplete="false"
                          placeholder="DemonSl@yer123"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>This is your password.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="confirmPassword"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="DemonSl@yer123"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Re-enter your password to combat your STM.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}
