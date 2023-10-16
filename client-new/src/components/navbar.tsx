"use client";

import LoginDialog from "./LoginComponent";
import { UserNav } from "./UserNav";
import { NavLinks } from "./navlinks";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import AuthenticationPage from "@/app/login/page";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function Navbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { user } = useAuthContext();
  console.log(user);
  return (
    <div className="border-b px-2">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="w-[32px]">
          <h1 className=" font-extrabold text-3xl text-primary align-top">
            StudentGo
          </h1>
        </div>

        <NavLinks />
        <div className="space-x-4">
          {/* <Search /> */}
          {user ? <UserNav /> : <LoginDialog />}
        </div>
      </div>
    </div>
  );
}
