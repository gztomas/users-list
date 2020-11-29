const PlaywrightEnv = require("jest-playwright-preset/lib/PlaywrightEnvironment")
  .default;

/**
 * If using iTerm, print the image in terminal, otherwise as a base64 string
 * @param {string} base64
 */
const termImage = (base64) =>
  process.env.TERM_PROGRAM === "iTerm.app"
    ? `\u001B]1337;File=inline=1:${base64}\u0007`
    : `🚩Open image snapshot in a browser: data:image/png;base64,${base64} 📸`;

/**
 * Provides visual feedback as screen captures when tests fail
 */
module.exports = class extends PlaywrightEnv {
  async handleTestEvent(event) {
    const rootSelector = "body";
    if (event.name === "test_done" && event.test.errors.length > 0) {
      const element =
        (await this.global.page.$(rootSelector)) || this.global.page;
      console.log(termImage((await element.screenshot()).toString("base64")));
    }
  }
};
