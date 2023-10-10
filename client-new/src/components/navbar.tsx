import { UserNav } from "./UserNav";
import { NavLinks } from "./navlinks";

export default function Navbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
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
          {/* If not logged in, display login button here */}
          <UserNav />
        </div>
      </div>
    </div>
  );
}
