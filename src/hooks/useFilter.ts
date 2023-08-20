import { useMemo, useState } from "react";
import { TaskList } from "../services/todos/types";

export enum filterValues {
    DONE = "done",
    PENDING = "pending",
    ALL = "all"
}

export const filterOptions = [
    { value: filterValues.DONE, label: "Done" },
    { value: filterValues.PENDING, label: "Pending" },
    { value: filterValues.ALL, label: "All", default: true },
  ]

export const useFilter = (data?: TaskList) => {
  const [filterParam, setFilterParam] = useState(filterValues.ALL);

  const filteredItems = useMemo(() => {
    if (data)
      return [...data]
        ?.filter((item) => {
          return filterParam === filterValues.ALL
            ? true
            : filterParam === filterValues.DONE
            ? item.completed
            : !item.completed;
        })
        .sort((a, b) => a.order - b.order);
  }, [data, filterParam]);

  return { filterParam, setFilterParam, filteredItems };
};
