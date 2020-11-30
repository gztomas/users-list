# Users List App

Demo App that displays and provides edition for a user list.

Try the [demo](https://dev.d2fe8k909cfdzv.amplifyapp.com)

## Tech stack

- AppSync for gql API + DynamoDB for data source
- Apollo Client for gql client and data caching
- Next.js for FE bundling
- Jest + Testing Library for unit tests
- Playwright for functional and visual regression tests

## Getting started

Install dependencies

```bash
npm install
```

Install Amplify CLI tool

```bash
npm install -g @aws-amplify/cli
```

Initialize and configure amplify

```bash
amplify init
amplify push
```

Run locally

```bash
npm run dev
```

Navigate to app <http://localhost:3000/>

## Tests

We have two projects ran by jest: `unit` and `functional`. The former runs on the default jest `jsdom` env, while the latter runs on playwright. Check out `jest.config.js` file.

To run tests, first build the project:

```bash
npm run build
```

Then

```bash
npm test
```

If ran with iTerm, failing functional tests will output an inline screenshot. A `jest-screenshot-report` folder will be generated with and image compare tool in case any visual regression test fails.

To run just one project, let's say unit tests only:

```bash
npm test -- --selectProjects unit
```

To achieve deterministic tests, functional tests run against an MSW mocked backend. Check `src/mockServer.ts`

### Troubleshooting

```bash
DEBUG=true npm test
```

DEBUG env variable will open the browser for functional tests.

## Whishlist

Things I would like to add with more time

- Focus trap for the modal
- Server side rendering
