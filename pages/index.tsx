import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import Head from "next/head";
import * as React from "react";
import { globalStyles } from "../src/components/system/theme";
import { UsersList } from "../src/components/UsersList";

const Home = () => (
  <Page>
    <Global styles={globalStyles} />
    <Head>
      <title>Users List</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
        rel="stylesheet"
      />
    </Head>
    <Main>
      <UsersList />
    </Main>
  </Page>
);

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 7px 0;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 11rem 6rem 5rem 6rem;
  max-width: 83rem;
`;

export default Home;
