import { UserNav } from "./UserNav";
import { NavLinks } from "./navlinks";

export default function Navbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="border-b px-2">
      <div className="flex h-16 items-center px-4">
        <h1 className=" font-extrabold text-3xl text-primary align-top">
          StudentGo
        </h1>
        <NavLinks className="mx-auto space-x-4 align-left" />
        <div className="pl-24 flex items-center space-x-4">
          {/* <Search /> */}
          <UserNav />
        </div>
      </div>
    </div>
  );
}
