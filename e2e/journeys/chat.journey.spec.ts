import {test, expect} from "@playwright/test";

test.describe("ResearchOS workspace", () => {
  test("opens the real in-process Vibe chat with an enabled composer", async ({page}) => {
    await page.goto("/");

    const researchChat = page.getByRole("link", {name: /research chat/i});
    await expect(researchChat).toBeVisible({timeout: 30_000});
    await researchChat.click();

    await expect(page).toHaveURL(/\/agents\/[0-9a-f-]+\/chat-new/);
    const composer = page.locator("#chat-input-textarea");
    await expect(composer).toBeVisible({timeout: 30_000});
    await expect(composer).toBeEnabled();
    await composer.fill("Compare the strongest evidence in my research library.");
    await expect(composer).toHaveValue(
      "Compare the strongest evidence in my research library.",
    );
  });

  test("navigates between the agent library, memory, and settings", async ({page}) => {
    await page.goto("/");
    await page.getByRole("link", {name: /research chat/i}).click();

    for (const destination of ["Library", "Memory", "Settings"]) {
      await page.getByRole("link", {name: destination, exact: true}).click();
      await expect(page).toHaveURL(new RegExp(`/${destination.toLowerCase()}(?:\\?|$)`));
      await expect(page.locator("nextjs-portal")).toHaveCount(0);
    }
  });
});
