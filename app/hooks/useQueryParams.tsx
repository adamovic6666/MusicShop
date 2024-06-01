import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { QueryParams } from "../_types/Index";

const useQueryParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const setQueryParam = useCallback(
    (queryName: string, value: string) => {
      if (queryName === QueryParams.Search && !value) {
        const params = new URLSearchParams(searchParams);
        params.delete(queryName);
        router.push(`${pathname}?${params.toString()}`);
        return;
      }

      router.push(`${pathname}?${createQueryString(queryName, value)}`);
    },
    [createQueryString, pathname, router, searchParams]
  );

  return { queryParams: searchParams, createQueryString, setQueryParam };
};

export default useQueryParams;
