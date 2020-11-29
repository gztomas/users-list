import { root } from "./selectors";

test("visual regression", async () => {
  expect(await (await page.$(root))?.screenshot()).toMatchImageSnapshot();
});
