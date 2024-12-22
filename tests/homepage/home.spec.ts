import { test, expect } from "@playwright/test";
import exp from "constants";

test.describe("Home page with no auth", () => {
    test.beforeEach(async ({page}) => {
        await page.goto("https://practicesoftwaretesting.com/");
    });

    test("Visual Test", async({page}) => {
        await page.waitForLoadState("networkidle");
        await expect(page).toHaveScreenshot("home-page-no-auth.png", {
            mask: [page.getByTitle("Practice Software Testing - Toolshop")]
        }); 
    });
    test("Check SignIn", async({page}) => {
    //Ensure that the sign in link is present
    await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");
    });
    test("Validate Page Title", async ({page}) => {    
    //check the title of the page
    await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");
    })
    test("Grid loads with 9 items", async ({page}) => {    
    //check the count of the items
    const productGrid=page.locator(".col-md-9");
    await expect(productGrid.getByRole("link")).toHaveCount(9);
    expect(await productGrid.getByRole("link").count()).toBe(9);
    })
    test("Search for Thor Hammer", async ({page}) => {   
    //check for thor hammer and check result in GRID (Assertion) card-img-top
    const productGrid=page.locator(".col-md-9");
    await page.getByTestId("search-query").fill("Thor Hammer");
    await page.getByTestId("search-submit").click();
    await expect(productGrid.getByRole("link")).toHaveCount(1);
    await expect(page.getByAltText("Thor Hammer")).toBeVisible(); 
    });
});

test.describe("Home page 01 auth", () => {
    test.use({ storageState: ".auth/customer01.json"});
    test.beforeEach( async ({page}) => {
        await page.goto("https://practicesoftwaretesting.com/");
    });

    test("visual test authorised", async ({page}) =>{
        await page.waitForLoadState("networkidle");
        await expect(page).toHaveScreenshot("home-page-customer01.png", {
            mask: [page.getByTitle("Practice Software Testing - Toolshop")]
        } );
        });
    test("check customer 01 is signed in", async ({page}) =>{
    await expect(page.getByTestId("nav-sign-in")).not.toBeVisible();
    await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");
    });
});