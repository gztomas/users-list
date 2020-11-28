import { gql, useQuery } from "@apollo/client";
import { useRef } from "react";
import {
  ListUsersQuery,
  ListUsersQueryVariables,
  SearchUsersQuery,
  SearchUsersQueryVariables,
} from "../API";
import { listUsers, searchUsers } from "../graphql/queries";

export const useUsersList = (match: string) => {
  const {
    data: searchData,
    fetchMore: fetchMoreSearch,
    loading: searchLoading,
  } = useQuery<SearchUsersQuery, SearchUsersQueryVariables>(gql(searchUsers), {
    notifyOnNetworkStatusChange: true,
    skip: !match,
    variables: { limit: 6, filter: { name: { match } } },
  });

  const {
    data: listData,
    fetchMore: fetchMoreList,
    loading: listLoading,
  } = useQuery<ListUsersQuery, ListUsersQueryVariables>(gql(listUsers), {
    notifyOnNetworkStatusChange: true,
    skip: Boolean(match),
    variables: { limit: 6, filter: { name: { contains: match } } },
  });

  const usersRef = useRef(listData?.listUsers ?? searchData?.searchUsers);
  usersRef.current =
    listData?.listUsers ?? searchData?.searchUsers ?? usersRef.current;
  const fetchMore = match ? fetchMoreSearch : fetchMoreList;

  return {
    users: usersRef.current,
    loading: searchLoading || listLoading,
    loadMore: () =>
      fetchMore({
        variables: { nextToken: usersRef.current?.nextToken },
      }),
  };
};
