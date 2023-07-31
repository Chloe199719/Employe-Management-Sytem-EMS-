"use client";

import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import fetchSearchTrackingTimeResult from "@/lib/frontend/GetSearchTrackingTimes";

import { BiTask } from "react-icons/bi";

type Props = {};
//
function SearchTime({}: Props) {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const debouncedSearchTerm = useDebounce(search, 500);
  const tasksSearch = useQuery({
    queryKey: ["timetracking"],
    queryFn: async () => fetchSearchTrackingTimeResult(debouncedSearchTerm),
  });

  useEffect(() => {
    tasksSearch.refetch();
  }, [debouncedSearchTerm]);

  return (
    <div className="flex px-4 py-7  md:p-10 gap-5 items-center bg-base-100 rounded-lg flex-wrap shadow-xl shadow-base-300">
      <h2 className="text-xl hidden md:block ">Times</h2>
      <div className="join flex-1">
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="form-input pl-4 md:join-item flex-1 text-secondary rounded-xl md:rounded-l-xl focus:ring-0 focus:border-secondary md:border-r-0 w-9"
          placeholder="Search Day or employer name or email"
        />
        <button className="btn join-item rounded-r-xl hidden md:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      <Sheet
        onOpenChange={(modal) => {
          setShowModal(modal);
        }}
        open={showModal}
      >
        <SheetTrigger className="btn">
          <span className="hidden md:block">Manually AddTime </span>
          <span className="">
            <BiTask className="h-4 w-4" />
          </span>
        </SheetTrigger>
        {/* <ModalAddTask setModal={setShowModal} trigger={showModal} /> */}
      </Sheet>
    </div>
  );
}
export default SearchTime;
