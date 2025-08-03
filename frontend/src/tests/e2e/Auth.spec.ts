import test from "playwright/test";

test.describe("Auth test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ru");
    await page.evaluate(() => localStorage.clear());
  });

  test("Login Buyer", async ({ page }) => {
    await page.getByTestId("openLoginModal-btn").click();
    await page.getByTestId("login-btn").click();
    await page.getByTestId("choose-buyer-btn").click();

    await page.getByTestId("login-email").fill("buyer1@gmail.com");
    await page.getByTestId("login-password").fill("Buyer11_");
    await page.getByTestId("login-submit-btn").click();

    await page.waitForURL("/ru/profile/buyer");
  });

  test("Login Seller", async ({ page }) => {
    await page.getByTestId("openLoginModal-btn").click();
    await page.getByTestId("login-btn").click();
    await page.getByTestId("choose-seller-btn").click();

    await page.getByTestId("login-email").fill("seller1@gmail.com");
    await page.getByTestId("login-password").fill("Seller11_");
    await page.getByTestId("login-submit-btn").click();

    await page.waitForURL("/ru/profile/seller");
  });

  test("Registration Buyer", async ({ page }) => {
    await page.getByTestId("openLoginModal-btn").click();
    await page.getByTestId("registration-btn").click();
    await page.getByTestId("choose-buyer-btn").click();

    await page.getByTestId("reg-email").fill("buyer41@gmail.com");
    await page.getByTestId("reg-password").fill("Buyer411_");
    await page.getByTestId("reg-submit-btn").click();

    await page.waitForURL("/ru/profile/buyer");
  });

  test("Registration Seller", async ({ page }) => {
    await page.getByTestId("openLoginModal-btn").click();
    await page.getByTestId("registration-btn").click();
    await page.getByTestId("choose-seller-btn").click();

    await page.getByTestId("reg-email").fill("seller10@gmail.com");
    await page.getByTestId("reg-password").fill("Seller110_");
    await page.getByTestId("reg-country").fill("Беларусь");
    await page.getByTestId("reg-org-type").fill("ООО");
    await page.getByTestId("reg-itn").fill("1234567890");
    await page.getByTestId("reg-last-name").fill("Иванов");
    await page.getByTestId("reg-first-name").fill("Сергей");
    await page.getByTestId("reg-patronymic").fill("Петрович");
    await page.getByTestId("reg-company-name").fill("БелТоргПром");

    await page.getByTestId("reg-submit-btn").click();

    await page.waitForURL("/ru/profile/seller");
  });

  // test("Switch profile", async ({ page }) => {});

  // test("Refetch profile", async ({ page }) => {});
});
