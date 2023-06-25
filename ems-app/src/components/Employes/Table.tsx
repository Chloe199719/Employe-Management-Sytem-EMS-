"use client";

import { useQuery } from "@tanstack/react-query";
import { DataTable } from "./DataTable";
import { columns } from "./columns";
import fetchSearchResult from "@/lib/frontend/GetSearchEmploye";
import { Employee } from "@prisma/client";

type Props = {};
function Table({}: Props) {
  const employee = useQuery({
    queryKey: ["employee"],
  });
  if (employee.isLoading) {
    return <div>Loading...</div>;
  }
  if (employee.isError) {
    return <div>Error</div>;
  }

  return (
    <div className=" bg-base-100 rounded-xl shadow-xl shadow-base-30">
      <DataTable columns={columns} data={employee.data as Employee[]} />
    </div>
  );
}
export default Table;
