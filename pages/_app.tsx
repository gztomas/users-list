import { ApolloProvider, NormalizedCacheObject } from "@apollo/client";
import { ComponentType } from "react";
import { useApollo } from "../src/apolloClient";

import { Amplify } from "aws-amplify";
import awsExports from "../src/aws-exports";
Amplify.configure({ ...awsExports, ssr: true });

const App = <P extends { initialApolloState: NormalizedCacheObject | null }>({
  Component,
  pageProps,
}: {
  Component: ComponentType<P>;
  pageProps: P;
}) => (
  <ApolloProvider client={useApollo(pageProps.initialApolloState)}>
    <Component {...pageProps} />
  </ApolloProvider>
);

export default App;
