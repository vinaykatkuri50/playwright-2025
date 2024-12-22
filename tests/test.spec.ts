import { test, expect } from '@playwright/test'
import { LoginPage1 } from '../steps/page-objects/login-page.pom'

test('should login using POM', async({ page})=>{

    const loginPage= new LoginPage1(page)

    await page.goto('https://binaryville.com/account/')
    await loginPage.emailLocator.fill('test@example.com')
    await loginPage.passwordLocator.fill('pass123')
    await loginPage.signInButtonLocator.click();

    expect(page.url()).toContain('pass123')
})