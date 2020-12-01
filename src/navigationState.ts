type NavigationState = { limit?: number; query?: string };

/**
 * Reads `query` and `limit` values from current URI
 */
export const getUriState = () => {
  const result: NavigationState = {};
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

/**
 * Updates URI with `query` and `limit` values of current navigation state, so
 * it is preserved after page refresh
 */
export const setUriState = ({ query, limit }: NavigationState) => {
  const params = new URLSearchParams(window?.location.search);
  if (limit) {
    params.set("limit", String(limit));
  } else {
    params.delete("limit");
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
};
