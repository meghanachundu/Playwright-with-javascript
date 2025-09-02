import { test, expect } from "@playwright/test";

test.describe("Waits, Alerts & Frames", () => {
  test("auto-wait vs manual wait", async ({ page }) => {
    await page.goto("https://playwright.dev/");
    const getStarted = page.locator(".getStarted_Sjon");

    // Auto-wait: Playwright waits for the link to be visible
    await getStarted.click();

    // Manual wait (not recommended except debugging)
    await page.waitForTimeout(2000);

    await expect(page).toHaveURL(/.*docs/);
  });

  test("handle alert dialog", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

    // Listen for dialogs
    page.once("dialog", async (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      await dialog.accept(); // or dialog.dismiss()
    });

    await page.getByRole("button", { name: "Click for JS Alert" }).click();
    await expect(page.locator("#result")).toHaveText(
      "You successfully clicked an alert"
    );
  });

  test("handle confirm dialog", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

    page.once("dialog", async (dialog) => {
      await dialog.dismiss(); // cancel
    });

    await page.getByRole("button", { name: "Click for JS Confirm" }).click();
    await expect(page.locator("#result")).toHaveText("You clicked: Cancel");
  });

  test("handle prompt dialog", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

    page.once("dialog", async (dialog) => {
      await dialog.accept("Playwright Rocks!"); // enter text
    });

    await page.getByRole("button", { name: "Click for JS Prompt" }).click();
    await expect(page.locator("#result")).toHaveText(
      "You entered: Playwright Rocks!"
    );
  });

  test("working with iframes", async ({ page }) => {
    await page.goto(
      "https://www.w3schools.com/html/tryit.asp?filename=tryhtml_iframe_height_width"
    );

    const frame = page.frameLocator("#iframeResult");
    const innerFrame = frame.frameLocator("iframe");
    const heading = innerFrame.locator("h1");
    await expect(heading).toHaveText("This page is displayed in an iframe");
  });
});
