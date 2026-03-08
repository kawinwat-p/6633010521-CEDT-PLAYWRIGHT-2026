import { test, expect } from '@playwright/test'

test.describe('Login Feature', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://katalon-demo-cura.herokuapp.com/')
		await page.locator('#menu-toggle').click()
		await page.getByRole('link', { name: 'Login' }).click()
	})

	test('Verify login fail with invalid password', async ({ page }) => {
		await test.step('Fill valid username', async () => {
			await page.fill('#txt-username', 'John Doe')
		})

		await test.step('Fill invalid password', async () => {
			await page.fill('#txt-password', 'WrongPassword')
		})

		await test.step('Click login button', async () => {
			await page.getByRole('button', { name: 'Login' }).click()
		})

		await test.step('Verify error message', async () => {
			await expect(
				page.getByText(
					'Login failed! Please ensure the username and password are valid.'
				)
			).toBeVisible()
		})
	})

	test('Verify login fail with invalid username', async ({ page }) => {
		await test.step('Fill invalid username', async () => {
			await page.fill('#txt-username', 'WrongUsername')
		})

		await test.step('Fill valid password', async () => {
			await page.fill('#txt-password', 'ThisIsNotAPassword')
		})

		await test.step('Click login button', async () => {
			await page.getByRole('button', { name: 'Login' }).click()
		})

		await test.step('Verify error message', async () => {
			await expect(
				page.getByText(
					'Login failed! Please ensure the username and password are valid.'
				)
			).toBeVisible()
		})
	})

	test('Verify login pass with valid user', async ({ page }) => {
		await test.step('Fill valid username', async () => {
			await page.fill('#txt-username', 'John Doe')
		})

		await test.step('Fill valid password', async () => {
			await page.fill('#txt-password', 'ThisIsNotAPassword')
		})

		await test.step('Click login button', async () => {
			await page.getByRole('button', { name: 'Login' }).click()
		})

		await test.step('Verify make appointment page', async () => {
			await expect(page).toHaveURL(/#appointment/)
		})
	})
})
