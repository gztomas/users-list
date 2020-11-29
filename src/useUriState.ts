import * as React from "react";

export const getUriState = () => {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window?.location.search);
  const limitParam = params.get("limit");
  return {
    limit: limitParam ? parseInt(limitParam, 10) : undefined,
    query: params.get("query") ?? undefined,
  };
};

export const useUriState = ({
  query,
  limit,
}: {
  query?: string;
  limit?: number;
}) => {
  React.useEffect(() => {
    const params = new URLSearchParams();
    if (limit && limit > 6) {
      params.set("limit", String(limit));
    }
    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }
    const search = params.toString();
    history.pushState(
      null,
      "",
      search ? location.pathname + "?" + search : location.pathname
    );
  });
};
