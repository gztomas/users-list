import { gql, useQuery } from "@apollo/client";
import * as React from "react";
import { SearchUsersQuery, SearchUsersQueryVariables } from "./API";
import { searchUsers } from "./graphql/queries";

const DEFAULT_PAGE_SIZE = 6;

export const useUsersList = (query: string, limit = DEFAULT_PAGE_SIZE) => {
  const [debouncedQuery, setDebouncedQuery] = React.useState(query);
  React.useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const { data, fetchMore, loading, error } = useQuery<
    SearchUsersQuery,
    SearchUsersQueryVariables
  >(gql(searchUsers), {
    notifyOnNetworkStatusChange: true,
    variables: {
      limit,
      filter: debouncedQuery
        ? { name: { wildcard: `*${debouncedQuery.toLowerCase()}*` } }
        : null,
    },
  });

  const dataRef = React.useRef(data);
  dataRef.current = data ?? dataRef.current;

  const users = dataRef.current?.searchUsers;
  const hasMore = Boolean(
    users?.items && users.total && users.items.length < users.total
  );

  return {
    users: dataRef.current?.searchUsers,
    loading,
    error,
    hasMore,
    loadMore: () =>
      fetchMore({
        variables: {
          nextToken: dataRef.current?.searchUsers?.nextToken,
          limit: DEFAULT_PAGE_SIZE,
        },
      }),
  };
};
