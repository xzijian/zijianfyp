import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

declare interface StudentsCardProps {
  students: string[];
}

export function StudentsCard({ students }: StudentsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Students</CardTitle>
        <CardDescription>All students in this module!</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {students &&
          students.map((student) => (
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/avatars/01.png" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    Sofia Davis
                  </p>
                  <p className="text-sm text-muted-foreground">{student}</p>
                </div>
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
