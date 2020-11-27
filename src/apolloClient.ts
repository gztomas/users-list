import {
  ApolloClient,
  FieldMergeFunction,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { useMemo } from "react";
import { ListUsersQuery } from "./API";
import aws_config from "./aws-exports";

let apolloClient: ReturnType<typeof createClient>;

const mergeListUsersQuery: FieldMergeFunction<
  Partial<ListUsersQuery["listUsers"]>
> = (existing, incoming) => ({
  ...existing,
  ...incoming,
  items: [...(existing?.items ?? []), ...(incoming?.items ?? [])],
});

const createClient = () =>
  new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: aws_config.aws_appsync_graphqlEndpoint,
      headers: { "x-api-key": aws_config.aws_appsync_apiKey },
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            listUsers: { keyArgs: ["filter"], merge: mergeListUsersQuery },
          },
        },
      },
    }),
  });

export const initializeApollo = (
  initialState: NormalizedCacheObject | null = null
) => {
  const client = apolloClient ?? createClient();
  if (initialState) {
    const existingCache = client.extract();
    client.cache.restore({ ...existingCache, ...initialState });
  }
  if (typeof window === "undefined") return client;
  if (!apolloClient) apolloClient = client;
  return client;
};

export const useApollo = (initialState: NormalizedCacheObject | null) =>
  useMemo(() => initializeApollo(initialState), [initialState]);
