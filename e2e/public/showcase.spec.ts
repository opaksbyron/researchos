import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("public ResearchOS showcase", () => {
  test("explains the product and exposes the main paths", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Research that shows its working." }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Try the guided demo" })).toHaveAttribute(
      "href",
      "/demo",
    );
    await expect(page.getByRole("link", { name: "Read the case study" })).toHaveAttribute(
      "href",
      "/case-study",
    );
    await expect(page.getByRole("link", { name: "Open workspace" })).toHaveAttribute(
      "href",
      "/workspace",
    );

    const hasNoHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    );
    expect(hasNoHorizontalOverflow).toBe(true);

    const accessibility = await new AxeBuilder({ page }).analyze();
    const seriousViolations = accessibility.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact ?? ""),
    );
    expect(seriousViolations).toEqual([]);
  });

  test("walks through every guided demo step", async ({ page }) => {
    await page.goto("/demo");

    const ground = page.getByRole("tab", { name: "Ground" });
    const question = page.getByRole("tab", { name: "Question" });
    const verify = page.getByRole("tab", { name: "Verify" });

    await expect(ground).toHaveAttribute("aria-selected", "true");
    await expect(page.getByText("Building ResearchOS with ibl.ai Vibe")).toBeVisible();

    await question.click();
    await expect(question).toHaveAttribute("aria-selected", "true");
    await expect(page.getByText(/Rendering an SDK component/)).toBeVisible();

    await verify.click();
    await expect(verify).toHaveAttribute("aria-selected", "true");
    await expect(page.getByText("Browser authentication and session readiness.")).toBeVisible();

    const hasNoHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    );
    expect(hasNoHorizontalOverflow).toBe(true);
  });

  test("publishes the engineering case study", async ({ page }) => {
    await page.goto("/case-study");

    await expect(
      page.getByRole("heading", { name: "The visible component was only the top layer." }),
    ).toBeVisible();
    await expect(page.getByText("A dependency chain, not a component catalogue.")).toBeVisible();
    await expect(page.getByText("The most useful bug was a silent disabled state.")).toBeVisible();
    await expect(page.locator("nextjs-portal")).toHaveCount(0);
  });
});
