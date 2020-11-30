import "expect-playwright";
import "jest-playwright-preset";
import { setupJestScreenshot } from "jest-screenshot";

// The CI running in a docker image will never render the exact same thing as
// the devs osx system. The solution for this would be to dockerize the
// functional tests runner so the render happens always in the same system.
// Until we have that, keeping a 10% threshold only in the CI so we still can
// notice small visual diffs during development.
setupJestScreenshot({
  pixelThresholdRelative: process.env.CI ? 0.1 : 0.01,
});

// Jest default timeout is 5s, which works great for tests in node, but we are
// using jest-playwright here. Driving the browser makes things usually take
// longer. We want jest timeout always to be bigger than playwright timeout so
// we have more explanatory output on timeout.
jest.setTimeout(10000);
page.setDefaultTimeout(5000);

beforeEach(() => page.goto("http://localhost:5000?msw=true"));
