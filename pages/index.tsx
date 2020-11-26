import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import Head from "next/head";
import { Gallery } from "../src/components/Gallery";

const Home = () => (
  <Page>
    <Global styles={globalStyles} />
    <Head>
      <title>Users List</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Main>
      <Title>Users list</Title>
      <Gallery />
    </Main>
  </Page>
);

const globalStyles = css`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Main = styled.main`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Page = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
  text-align: center;
`;

export default Home;
