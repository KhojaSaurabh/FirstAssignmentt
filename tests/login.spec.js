import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';

test.describe('OrangeHRM Login and Dashboard', () => {

  let loginPage;
  let dashboardPage;
  let page;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
  });

  test.afterAll(async () => {
    await page.context().close();
  });

  test('Test Case 1: Verify Login Page Loads Successfully', async () => {
    await loginPage.navigateToLoginPage();
    await loginPage.isLoginPageLoaded();
    await page.waitForTimeout(7000); 
  });

  test('Test Case 2: Perform Valid Login', async () => {
    await loginPage.navigateToLoginPage();
    await loginPage.login('Admin', 'admin123');
    await dashboardPage.isDashboardPageLoaded();
  }); 

  test('Test Case 3: Verify User is Redirected to Dashboard', async () => {
    await loginPage.navigateToLoginPage();
    await loginPage.login('Admin', 'admin123');
    await dashboardPage.isDashboardPageLoaded();
    await dashboardPage.verifySideMenuOptions();
  }); 

  test('Test Case 4: Handle Invalid Login', async () => {
    await loginPage.navigateToLoginPage();
    await loginPage.login('InvalidUser', 'InvalidPassword');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Invalid credentials');
  });  

  test('Test Case 5: Verify Logout Functionality', async () => {
    await loginPage.navigateToLoginPage();
    await loginPage.login('Admin', 'admin123');
    await dashboardPage.isDashboardPageLoaded();
    await dashboardPage.logout();
    await loginPage.isLoginPageLoaded();
  });

});

