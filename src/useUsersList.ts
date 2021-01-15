import { gql, useQuery } from "@apollo/client";
import * as React from "react";
import { ListUsersQuery, ListUsersQueryVariables } from "./API";
import { DEFAULT_PAGE_SIZE } from "./constants";
import { listUsers } from "./graphql/queries";

/**
 * Hook that syncs state between server state and presentation for a given
 * query and limit.
 * @param query
 * @param limit
 */
export const useUsersList = (query: string, limit = DEFAULT_PAGE_SIZE) => {
  const [debouncedQuery, setDebouncedQuery] = React.useState(query);

  // Debounce gql query requests
  React.useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const { data, fetchMore, loading, error } = useQuery<
    ListUsersQuery,
    ListUsersQueryVariables
  >(gql(listUsers), {
    notifyOnNetworkStatusChange: true,
    variables: {
      limit,
      filter: debouncedQuery ? { name: { contains: debouncedQuery } } : null,
    },
  });

  // We want to keep showing existing data while a new search is in flight.
  // That's what will allow us to display local filtered results while we get
  // the ones from the API.
  const dataRef = React.useRef(data);
  dataRef.current = data ?? dataRef.current;

  const users = dataRef.current?.listUsers;
  const hasMore = Boolean(users?.items && users.nextToken);

  return {
    users: dataRef.current?.listUsers,
    loading,
    error,
    hasMore,
    loadMore: () =>
      fetchMore({
        variables: {
          nextToken: dataRef.current?.listUsers?.nextToken,
          limit: DEFAULT_PAGE_SIZE,
        },
      }),
  };
};
