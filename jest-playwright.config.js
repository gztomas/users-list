const debug =
  process.env.DEBUG === "true" || process.env.CI === "vscode-jest-tests";

module.exports = {
  browser: "chromium",
  browserContext: "default",
  launchOptions: {
    args: ["--disable-dev-shm-usage", "--no-sandbox"],
    dumpio: true,
    headless: !debug,
    slowMo: debug ? 20 : undefined,
  },
  serverOptions: {
    command: "npm run serve",
    port: 5000,
    usedPortAction: "ignore",
  },
};
