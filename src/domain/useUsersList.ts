import { gql, useQuery } from "@apollo/client";
import { useRef } from "react";
import { SearchUsersQuery, SearchUsersQueryVariables } from "../API";
import { searchUsers } from "../graphql/queries";

export const useUsersList = (match: string) => {
  const { data, fetchMore, loading, error } = useQuery<
    SearchUsersQuery,
    SearchUsersQueryVariables
  >(gql(searchUsers), {
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 6,
      filter: match ? { name: { wildcard: `*${match.toLowerCase()}*` } } : null,
    },
  });

  const dataRef = useRef(data);
  dataRef.current = data ?? dataRef.current;

  const users = dataRef.current?.searchUsers;
  const hasMore =
    users?.items && users.total && users.items.length < users.total;

  return {
    users: dataRef.current?.searchUsers,
    loading,
    error,
    hasMore,
    loadMore: () =>
      fetchMore({
        variables: { nextToken: dataRef.current?.searchUsers?.nextToken },
      }),
  };
};
