import {
  cancelButton,
  editModal,
  nameInput,
  root,
  saveButton,
  searchInput,
  userCard,
} from "./selectors";

test("list visual regression", async () => {
  await page.hover(userCard);
  expect(await (await page.$(root))?.screenshot()).toMatchImageSnapshot();
});

test("search", async () => {
  await page.fill(searchInput, "Nettie");
  const cards = await page.$$(userCard);

  expect(cards.length).toEqual(1);
  await expect(cards[0]).toEqualText("Nettie Koch");
});

test("edit modal visual regression", async () => {
  await page.click(userCard);
  await page.hover(cancelButton);
  expect(await (await page.$(editModal))?.screenshot()).toMatchImageSnapshot();
});

test("update user name", async () => {
  await page.click(userCard);
  await page.fill(nameInput, "New Name");
  await page.click(saveButton);
  await page.waitForSelector(editModal, { state: "detached" });
  await expect(page).toEqualText(userCard, "New Name");
});
