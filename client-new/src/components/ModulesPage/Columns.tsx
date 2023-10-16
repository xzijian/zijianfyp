"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { labels } from "@/components/ModulesPage/data";
import { Task } from "@/components/ModulesPage/schema";
import { DataTableColumnHeader } from "@/components/ModulesPage/DataTableColumnHeader";
import { DataTableRowActions } from "@/components/ModulesPage/DataTableRowActions";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Module" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-4 pl-4">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className=" max-w-[700px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
