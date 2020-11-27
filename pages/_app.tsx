import { ApolloProvider, NormalizedCacheObject } from "@apollo/client";
import { ThemeProvider } from "@emotion/react";
import { Amplify } from "aws-amplify";
import { ComponentType } from "react";
import { useApollo } from "../src/apolloClient";
import awsExports from "../src/aws-exports";
import { theme } from "../src/components/system/theme";

Amplify.configure({ ...awsExports, ssr: true });

const App = <P extends { initialApolloState: NormalizedCacheObject | null }>({
  Component,
  pageProps,
}: {
  Component: ComponentType<P>;
  pageProps: P;
}) => (
  <ThemeProvider theme={theme}>
    <ApolloProvider client={useApollo(pageProps.initialApolloState)}>
      <Component {...pageProps} />
    </ApolloProvider>
  </ThemeProvider>
);

export default App;
