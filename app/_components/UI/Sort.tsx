"use client";

import { QueryParams } from "@/app/_types/Index";
import { SortOptions } from "@/app/_utils";
import useQueryParams from "@/app/hooks/useQueryParams";

const Sort = () => {
  const { setQueryParam } = useQueryParams();

  return (
    <div className="sort">
      <label htmlFor="sort">Sort by:</label>
      <select
        name="sort"
        id="sort"
        onClick={(event) =>
          setQueryParam(
            QueryParams.Sort,
            (event.target as HTMLInputElement).value
          )
        }
      >
        {SortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Sort;
