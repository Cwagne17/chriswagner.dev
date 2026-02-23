import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const ROUTES_TO_SCAN = ["/", "/projects", "/services"];

const WCAG_2X_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

for (const route of ROUTES_TO_SCAN) {
  test(`Section 508 automated scan: ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: "networkidle" });

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(WCAG_2X_TAGS)
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
}
