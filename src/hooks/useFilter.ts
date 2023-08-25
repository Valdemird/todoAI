import { useMemo, useState } from "react";

import { TaskList } from "../services/todos/types";

export enum FilterValues {
  DONE = "done",
  PENDING = "pending",
  ALL = "all"
}

export const filterOptions = [
  { value: FilterValues.DONE, label: "Done" },
  { value: FilterValues.PENDING, label: "Pending" },
  { value: FilterValues.ALL, label: "All", default: true },
];

export const useFilter = (data?: TaskList) => {
  const [filterParam, setFilterParam] = useState(FilterValues.ALL);

  const filteredItems = useMemo(() => {
    if (!data) return [];
    
    return data.filter(item => {
      if (filterParam === FilterValues.ALL) return true;
      if (filterParam === FilterValues.DONE) return item.completed;
      return !item.completed;
    }).sort((a, b) => a.order - b.order);
  }, [data, filterParam]);

  return { filterParam, setFilterParam, filteredItems };
};