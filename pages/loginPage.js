// LoginPage.js
/**
 * The LoginPage class represents the login page of a website.
 * It provides methods to interact with the login page, such as opening the page, setting the username and password,
 * clicking the submit button, and checking if the login was successful.
 *
 * @class LoginPage
 */
class LoginPage {
  /**
   * Creates an instance of LoginPage.
   *
   * @param {Page} page - The Playwright Page object.
   * @memberof LoginPage
   */
  constructor(page) {
    this.page = page;
    
    // Elements
    this.usernameInput = 'input[name="username"]';
    this.passwordInput = 'input[name="password"]';
    this.submitButton = 'button[id="submit"]';
    this.loggedInMessageElement = '.post-header h1';
    this.logoutButton = 'a[class*="wp-block-button"]';
    this.errorMessageElement = 'div#error.show';
  }

  /**
   * Opens the login page.
   *
   * @memberof LoginPage
   */
  async open() {
    await this.page.goto(
      "https://practicetestautomation.com/practice-test-login/"
    );
  }

  /**
   * Sets the username on the login page.
   *
   * @param {string} username - The username to set.
   * @memberof LoginPage
   */
  async setUsername(username) {
    await this.page.fill(this.usernameInput, username);
  }

  /**
   * Sets the password on the login page.
   *
   * @param {string} password - The password to set.
   * @memberof LoginPage
   */
  async setPassword(password) {
    await this.page.fill(this.passwordInput, password);
  }

  /**
   * Clicks the submit button on the login page.
   *
   * @memberof LoginPage
   */
  async clickSubmit() {
    await this.page.click(this.submitButton);
  }

  /**
   * Checks if the login was successful by verifying the URL.
   *
   * @returns {boolean} - True if the login was successful, false otherwise.
   * @memberof LoginPage
   */
  async isLoggedInSuccessfully() {
    return this.page
      .url()
      .includes("practicetestautomation.com/logged-in-successfully/");
  }

  /**
   * Retrieves the logged in message from the page.
   *
   * @returns {string} - The logged in message.
   * @memberof LoginPage
   */
  async getLoggedInMessage() {
    await this.page.waitForSelector(this.loggedInMessageElement);
    const messageElement = await this.page.$(this.loggedInMessageElement);
    return await messageElement.textContent();
  }

  /**
   * Checks if the logout button is displayed on the page.
   *
   * @returns {boolean} - True if the logout button is displayed, false otherwise.
   * @memberof LoginPage
   */
  async isLogoutButtonDisplayed() {
    return await this.page.isVisible(this.logoutButton);
  }

  /**
   * Checks if the error message is displayed on the page.
   *
   * @returns {boolean} - True if the error message is displayed, false otherwise.
   * @memberof LoginPage
   */
  async isErrorDisplayed() {
    return await this.page.isVisible(this.errorMessageElement);
  }

  /**
   * Retrieves the error message text from the page.
   *
   * @returns {string} - The error message text.
   * @memberof LoginPage
   */
  async getErrorMessageText() {
    await this.page.waitForSelector(this.errorMessageElement);
    const errorMessageElement = await this.page.$(this.errorMessageElement);
    return await errorMessageElement.textContent();
  }

  /**
   * Clicks the logout button on the page.
   *
   * @memberof LoginPage
   */
  async clickLogout() {
    await this.page.click(this.logoutButton);
  }

  /**
   * Checks if the user has been successfully logged out.
   *
   * @returns {Promise<boolean>} True if the user is logged out successfully, otherwise false.
   * @memberof LoginPage
   */
  async isLoggedOutSuccessfully() {
    const loginPageURL = "https://practicetestautomation.com/practice-test-login/";
    const currentURL = this.page.url();

    // Check if the current URL matches the login page URL
    return currentURL === loginPageURL;
  }

  /**
   * Checks if the login button is displayed on the page.
   *
   * @returns {Promise<boolean>} True if the login button is displayed, otherwise false.
   * @memberof LoginPage
   */
  async isLoginButtonDisplayed() {
    return this.page.isVisible(this.submitButton);
  }
}

module.exports = LoginPage;
