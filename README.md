# Project Name

This project uses Playwright as an automation tool with JavaScript to test [https://practicetestautomation.com/practice-test-login/].

## Prerequisites

To run this project, you'll need the following:

-   Node.js installed on your machine
-   NPM or Yarn installed on your machine

## Installation

To get started, follow these steps:

1.  Clone this repository to your local machine using the following command:

``` git clone https://github.com/yprajapati-007/Playwright-Assignment.git  ```

2.  Navigate to the project directory.
3.  Run `npm install` or `yarn install` to install the project dependencies.
4.  Run `npx playwright install` to install the playwright and playwright test.

## Configuration

You can configure the following options in the `config.js` file:

-   `HEADLESS`: Set to `true` to run tests in headless mode or `false` to run in non-headless mode.

## Running the Tests

To run the tests, follow these steps:

1.  Make sure the application or website you want to test is running.
2.  Navigate to the project directory.
3.  Run `npx playwright test` or `npm run test` to run the test suite.
4.  After the test suite completes, you can view the screenshots in the `screenshots` folder and the execution video in the `recordings` folder.

## Running with Docker

Alternatively, you can run the tests using Docker to ensure a consistent test environment. To do this, follow these steps:

1. Build the Docker image:

``` docker build -t playwright-test . ```

2. Create and start a Docker container from the image:

``` docker run -it playwright-test ```

After the test suite completes, you can view the test artifacts in the screenshots and recordings folders inside the container. To copy the artifacts from the container to your local machine, use the following command:

``` docker cp playwright-container:/path/to/artifacts /path/to/local/destination ```

## Contact

If you have any questions or feedback, please feel free to contact me.