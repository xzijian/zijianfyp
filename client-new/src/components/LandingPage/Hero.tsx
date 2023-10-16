"use client";

import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LoginDialog from "../LoginComponent";
import { useAuthContext } from "@/hooks/useAuthContext";

const image = "/heroImg.png";

export default function HeroHeader() {
  const { user } = useAuthContext();

  return (
    <section className="container flex flex-col gap-4 pb-12 pt-4 text-center lg:items-center lg:gap-8 lg:py-20">
      <div className="flex flex-1 flex-col items-center gap-4 text-center lg:gap-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold lg:text-6xl animate-typing overflow-hidden whitespace-nowrap border-r-4 border-4-black px-5">
            StudentGO
          </h1>
          <h2 className="text-lg font-light text-muted-foreground lg:text-3xl">
            A Communal Learning Platform
          </h2>
        </div>
        <div className=" space-x-8">
          {user ? (
            <>
              <Link
                href="/modules"
                target="_blank"
                className={`w-[10rem] ${cn(
                  buttonVariants({ size: "lg", variant: "default" })
                )}`}
              >
                Modules
              </Link>
              <Link
                href="/groups"
                target="_blank"
                className={`w-[10rem] ${cn(
                  buttonVariants({ size: "lg", variant: "outline" })
                )}`}
              >
                Groups
              </Link>
            </>
          ) : (
            <>
              <LoginDialog buttonClassName="w-[10rem]" />

              <Link
                href="/signUp"
                target="_blank"
                className={`w-[10rem] ${cn(
                  buttonVariants({ size: "lg", variant: "outline" })
                )}`}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
      {image !== null ? (
        <div className="flex flex-1 justify-center lg:justify-end">
          <Image src={image} width={500} height={500} alt="Header image" />
        </div>
      ) : (
        <></>
      )}
    </section>
  );
}
