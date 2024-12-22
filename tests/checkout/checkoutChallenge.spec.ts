import { test, expect } from "@playwright/test"
import { request } from "http";

test.describe("Checkout Challenge", async ()=> {
    test.use({ storageState: ".auth/customer01.json" });

    test.beforeEach( async ({page }) => {
    await page.goto("https://practicesoftwaretesting.com");
    });

    test("buy now pay later", async ({ page, headless}) => {
        await page.getByText("Claw Hammer with Shock Reduction Grip").click();
        await page.getByTestId("add-to-cart").click();
        await expect(page.getByTestId("cart-quantity")).toHaveText("1");
        await page.getByTestId("nav-cart").click();
        await page.getByTestId("proceed-1").click();
        await page.getByTestId("proceed-2").click();
        await expect(
            page.locator(".step-indicator").filter({ hasText: "2"})
        ).toHaveCSS("background-color", "rgb(51, 153, 51)");
        await page.getByTestId("address").fill("123 Testing Way");
        await page.getByTestId("city").fill("Hyderabad");
        await page.getByTestId("state").fill("Telangana");
        await page.getByTestId("country").fill("India");
        await page.getByTestId("postcode").fill("500034");
        await page.getByTestId("proceed-3").click();
        await expect(page.getByTestId("finish")).toBeDisabled();
        await page.getByTestId("payment-method").selectOption("Buy Now Pay Later");
        await page
        .getByTestId("monthly_installments")
        .selectOption("6 Monthly Installments");
        await page.getByTestId("finish").click();
        await expect(page.locator(".help-block")).toHaveText(
            "Payment was successful"
        );
        headless
        ? await test.step("visual test", async()=> {
            await expect(page).toHaveScreenshot("checkout.png", {
                mask: [page.getByTitle("Practice Software Testing - Toolshop")],
            });
        })
        : console.log("Running in Headed mode, no screenshot comp")
    });
});