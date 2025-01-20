const { expect } = require('@playwright/test');

class DashboardPage {
  constructor(page) {
    this.page = page;
    this.sideMenu = page.locator('.oxd-sidepanel');
    this.logoutButton = page.locator("//div[@id='app']//div//div//header//div//div//ul//li//span//i//following::a[normalize-space()='Logout']");

    this.sideMenuItems = page.locator('.oxd-sidepanel .oxd-main-menu li');
  }

  async isDashboardPageLoaded() {
    await expect(this.sideMenu).toBeVisible(); 
    await this.page.waitForSelector('//nav[@aria-label="Sidepanel"]/div[2]', { state: 'visible' }); 
    const count = await this.sideMenuItems.count();
    expect(count).toBeGreaterThan(0);  
  }

  async getSideMenuItems() {
    
    const menuItems = await this.sideMenuItems.allTextContents();
    const menuItemsArray = menuItems.map(item => item.trim()).filter(item => item.length > 0);
 
    return menuItemsArray;
  }

  async verifySideMenuOptions() {
   
    const menuItemsArray = await this.getSideMenuItems();

    const expectedItems = [
        'Admin', 'PIM', 'Leave', 'Time', 'Recruitment', 'My Info',
        'Performance', 'Dashboard', 'Directory', 'Maintenance', 'Claim', 'Buzz'
      ];
  
      expectedItems.forEach(item => {
        expect(menuItemsArray).toContain(item);
      });

  
    
  }

  async logout() { 
    await this.page.waitForSelector('//div[@id="app"]//div//div//header//div//div//ul//li//span//i//following::a[normalize-space()="Logout"]');
    
    await this.logoutButton.click();
  }
}

module.exports = DashboardPage;


