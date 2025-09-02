import { test, expect } from "@playwright/test";

test.describe("Playwright User Interactions", () => {
  test("typing into a search box", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const search = page.locator("#Wikipedia1_wikipedia-search-input");
    await search.fill("playwright");
    // await expect(search).toHaveValue("playwright");

    await page.locator(".wikipedia-search-button").click();
    const results = page.locator("#Wikipedia1_wikipedia-search-results a");
    await expect(results.first()).toBeVisible();
  });

  test('selecting from a dropdown (Country)', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const countryDropdown = page.locator('#country');
    await countryDropdown.selectOption('canada'); // value attribute
    await expect(countryDropdown).toHaveValue('canada');
  });

  test("checkbox & radio buttons", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const checkbox = page.locator("input[type='checkbox']").first();
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    const radio = page.locator("input[type='radio'][value='female']");
    await radio.check();
    await expect(radio).toBeChecked();
  });

  test("hover and click hidden menu", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const menu = page.locator(".dropbtn");
    await menu.hover();

    const option = page.locator("div[id='HTML3'] a:nth-child(2)");
    await expect(option).toBeVisible();
    await option.click();
  });

  test.only("drag and drop", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const source = page.locator("#draggable");
    const target = page.locator("#droppable");

    await source.dragTo(target);
    await expect(target).toContainText("Dropped!");
  });
});
