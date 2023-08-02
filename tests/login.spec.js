const { test, expect } = require("@playwright/test");
const path = require("path");
const LoginPage = require("../pages/loginPage");

const resultDir = "./screenshots";
const recordingsDir = "./recordings";

test("Positive LogIn test", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.setUsername("student");
  await loginPage.setPassword("Password123");
  await loginPage.clickSubmit();
  await page.waitForTimeout(5000); // Wait for 5 seconds after login

  const loggedInMessage = await loginPage.getLoggedInMessage();
  console.log("Logged In Message:", loggedInMessage);

  await expect(loggedInMessage).toContain("Logged In Successfully");

  await expect(loginPage.isLogoutButtonDisplayed()).toBeTruthy();

  await page.screenshot({ path: path.join(resultDir, "positive_login.png") });
});

test("Negative username test", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.setUsername("invalidUser");
  await loginPage.setPassword("Password123");
  await loginPage.clickSubmit();
  await page.waitForTimeout(2000); // Wait for 2 seconds after login attempt

  const errorMessage = await loginPage.getErrorMessageText();
  console.log("Error Message:", errorMessage);

  await expect(errorMessage).toContain("Your username is invalid!");

  await page.screenshot({
    path: path.join(resultDir, "negative_username.png"),
  });
});

test("Negative password test", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.setUsername("student");
  await loginPage.setPassword("invalidPassword");
  await loginPage.clickSubmit();
  await page.waitForTimeout(2000); // Wait for 2 seconds after login attempt

  const errorMessage = await loginPage.getErrorMessageText();
  console.log("Error Message:", errorMessage);

  await expect(errorMessage).toContain("Your password is invalid!");

  await page.screenshot({
    path: path.join(resultDir, "negative_password.png"),
  });
});

test("Negative: Login with empty username", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.setPassword("Password123");
  await loginPage.clickSubmit();
  await page.waitForTimeout(2000); // Wait for 2 seconds after login attempt

  const errorMessage = await loginPage.getErrorMessageText();
  console.log("Error Message:", errorMessage);

  await expect(errorMessage).toContain("Your username is invalid!");

  await page.screenshot({ path: path.join(resultDir, "empty_username.png") });
});

test("Negative: Login with empty password", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.setUsername("student");
  await loginPage.clickSubmit();
  await page.waitForTimeout(2000); // Wait for 2 seconds after login attempt

  const errorMessage = await loginPage.getErrorMessageText();
  console.log("Error Message:", errorMessage);

  await expect(errorMessage).toContain("Your password is invalid!");

  await page.screenshot({ path: path.join(resultDir, "empty_password.png") });
});

test("Negative: Login with both username and password empty", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.clickSubmit();
  await page.waitForTimeout(2000); // Wait for 2 seconds after login attempt

  const errorMessage = await loginPage.getErrorMessageText();
  console.log("Error Message:", errorMessage);

  await expect(errorMessage).toContain("Your username is invalid!");

  await page.screenshot({
    path: path.join(resultDir, "empty_username_password.png"),
  });
});

test("Negative: Login with incorrect username and password", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.setUsername("invalidUser");
  await loginPage.setPassword("invalidPassword");
  await loginPage.clickSubmit();
  await page.waitForTimeout(2000); // Wait for 2 seconds after login attempt

  const errorMessage = await loginPage.getErrorMessageText();
  console.log("Error Message:", errorMessage);

  await expect(errorMessage).toContain("Your username is invalid!");

  await page.screenshot({
    path: path.join(resultDir, "incorrect_username_password.png"),
  });
});

test("Negative: Login with locked user account", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.setUsername("lockedUser");
  await loginPage.setPassword("Password123");
  await loginPage.clickSubmit();
  await page.waitForTimeout(2000); // Wait for 2 seconds after login attempt

  const errorMessage = await loginPage.getErrorMessageText();
  console.log("Error Message:", errorMessage);

  await expect(errorMessage).toContain("Your username is invalid!");

  await page.screenshot({ path: path.join(resultDir, "locked_user.png") });
});

test("Positive: Login with valid credentials and logout", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.setUsername("student");
  await loginPage.setPassword("Password123");
  await loginPage.clickSubmit();

  const loggedInMessage = await loginPage.getLoggedInMessage();
  console.log("Logged In Message:", loggedInMessage);

  await expect(loggedInMessage).toContain("Logged In Successfully");
  await expect(loginPage.isLogoutButtonDisplayed()).toBeTruthy();

  await loginPage.clickLogout();

  await expect(loginPage.isLoggedOutSuccessfully()).toBeTruthy();
  await expect(loginPage.isLoginButtonDisplayed()).toBeTruthy();

  await page.screenshot({ path: path.join(resultDir, "login_and_logout.png") });
});

test("Negative: Login with SQL injection attempt", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.setUsername("invalidUser' OR '1'='1");
  await loginPage.setPassword("Password123");
  await loginPage.clickSubmit();
  await page.waitForTimeout(2000); // Wait for 2 seconds after login attempt

  const errorMessage = await loginPage.getErrorMessageText();
  console.log("Error Message:", errorMessage);

  await expect(errorMessage).toContain("Your username is invalid!");

  await page.screenshot({ path: path.join(resultDir, "sql_injection.png") });
});

// Add afterEach hook to close the browser after each test
test.afterEach(async ({ page }) => {
  await page.close();
});
