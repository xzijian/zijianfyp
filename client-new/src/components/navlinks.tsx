import Link from "next/link";

import { cn } from "@/lib/utils";

export function NavLinks({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </Link>
      <Link
        href="/modules"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Modules
      </Link>
      <Link
        href="/examples/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Groups
      </Link>
    </nav>
  );
}
