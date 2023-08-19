import { useMemo, useState } from "react";
import { TaskList } from "../services/todos/types";

export const useFilter = (data?: TaskList) => {
  const [filterParam, setFilterParam] = useState("all");

  const filteredItems = useMemo(() => {
    console.log("filterParam", filterParam);
    if (data)
      return [...data]
        ?.filter((item) => {
          return filterParam === "all"
            ? true
            : filterParam === "done"
            ? item.completed
            : !item.completed;
        })
        .sort((a, b) => a.order - b.order);
  }, [data, filterParam]);

  return { filterParam, setFilterParam, filteredItems };
};
