type UriState = { limit?: number; query?: string };

export const getUriState = () => {
  const result: UriState = {};
  if (typeof window === "undefined") return result;
  const params = new URLSearchParams(window?.location.search);
  const limitParam = params.get("limit");
  const queryParam = params.get("query");
  if (limitParam) {
    result.limit = parseInt(limitParam, 10);
  }
  if (queryParam) {
    result.query = queryParam;
  }
  return result;
};

export const setUriState = ({ query, limit }: UriState) => {
  const params = new URLSearchParams();
  if (limit) {
    params.set("limit", String(limit));
  }
  if (query) {
    params.set("query", query);
  }
  const search = params.toString();
  history.pushState(
    null,
    "",
    search ? location.pathname + "?" + search : location.pathname
  );
};
