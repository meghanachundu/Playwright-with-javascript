import { test, expect } from "@playwright/test";

test.describe("Locators & Assertions", () => {
  test("role + text locator examples", async ({ page }) => {
    await page.goto("https://playwright.dev/");

    // Using role
    const link = page.getByRole("link", { name: "Get started" });
    await expect(link).toBeVisible();

    // Using text
    await expect(page.getByText(/Getting Started/i)).toBeVisible(); // not on homepage
  });

  test("CSS + nth + filtering", async ({ page }) => {
    await page.goto("https://playwright.dev/docs/intro");

    // CSS locator for all sidebar links
    const links = page.locator(".navbar__items a");

    // Count links
    console.log(await links.count());

    // nth (first link)
    const firstLink = links.nth(0);
    await expect(firstLink).toBeVisible();

    // filter
    const filtered = links.filter({ hasText: "Docs" });
    await expect(filtered.first()).toBeVisible();
  });

  test("Attribute & text assertions", async ({ page }) => {
    await page.goto("https://playwright.dev/");

    // const githubLink = page.getByRole("link", { name: "GitHub" }).first();
    const githubLink = page.getByLabel("GitHub repository");
    await expect(githubLink).toHaveAttribute("href", /github\.com/);
  });
});
