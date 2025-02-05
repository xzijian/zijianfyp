import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LoginForm } from "./LoginForm";

export declare interface LoginDialogProps {
  children?: React.ReactNode; // best, accepts everything React can render
  buttonClassName?: string;
  className?: string;
}

export default function LoginDialog({
  className,
  buttonClassName,
  ...props
}: LoginDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            buttonClassName
          )}
        >
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[80%] max-w-[80%] max-h-[750px]">
        <div className="container relative hidden h-[700px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          <div className="relative hidden h-[100%] flex-col bg-muted p-10 text-white dark:border-r lg:flex">
            <div className="absolute inset-0 bg-orange-600" />
            <div className="relative z-20 flex items-center text-lg font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-6 w-6"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              StudentGo
            </div>
            <div className="relative z-20 mt-auto">
              <blockquote className="space-y-2">
                <p className="text-lg">
                  &ldquo;Studying should never be an individual work, we all
                  agree; Yet, there is no tool to that helps us.&rdquo;
                </p>
                <footer className="text-sm">Xie Zi Jian</footer>
              </blockquote>
            </div>
          </div>
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
                <p className="text-sm text-muted-foreground">
                  Enter your login credentials below to login.
                </p>
              </div>
              <LoginForm />
              <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <Link
                  href="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
