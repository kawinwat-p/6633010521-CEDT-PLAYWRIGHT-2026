import { test, expect } from '@playwright/test'

test.describe('Make Appointment Feature', () => {
	test.beforeEach(async ({ page }) => {
		await test.step('Navigate to login page', async () => {
			await page.goto('https://katalon-demo-cura.herokuapp.com/')
			await page.locator('#menu-toggle').click()
			await page.getByRole('link', { name: 'Login' }).click()
		})

		await test.step('Fill valid username', async () => {
			await page.fill('#txt-username', 'John Doe')
		})

		await test.step('Fill valid password', async () => {
			await page.fill('#txt-password', 'ThisIsNotAPassword')
		})

		await test.step('Click login button', async () => {
			await page.getByRole('button', { name: 'Login' }).click()
		})
	})

	test('Verify appointment form assertions', async ({ page }) => {
		await test.step('Verify Make Appointment title is displayed', async () => {
			await expect(page.locator('h2')).toHaveText('Make Appointment')
		})

		await test.step('Verify select all facility combo boxes', async () => {
			const facility = page.locator('#combo_facility')
			await expect(facility).toBeVisible()

			const options = await facility.locator('option').all()
			for (const opt of options) {
				const value = await opt.getAttribute('value')
				if (value) {
					await facility.selectOption(value)
					await expect(facility).toHaveValue(value)
				}
			}
		})

		await test.step('Verify hospital readmission checkbox', async () => {
			const readmission = page.locator('#chk_hospotal_readmission')
			await readmission.check()
			await expect(readmission).toBeChecked()
			await readmission.uncheck()
			await expect(readmission).not.toBeChecked()
		})

		await test.step('Verify select healthcare program radio buttons', async () => {
			const medicaid = page.locator('#radio_program_medicaid')
			const medicare = page.locator('#radio_program_medicare')
			const none = page.locator('#radio_program_none')

			await medicare.check()
			await expect(medicare).toBeChecked()

			await medicaid.check()
			await expect(medicaid).toBeChecked()

			await none.check()
			await expect(none).toBeChecked()
		})

		await test.step('Verify can input visit date', async () => {
			const today = new Date().toISOString().split('T')[0]
			const visitDate = page.locator('#txt_visit_date')
			await visitDate.fill(today)
			await expect(visitDate).toHaveValue(today)
		})

		await test.step('Verify can input comment', async () => {
			const comment = page.locator('#txt_comment')
			await comment.fill('Test appointment comment')
			await expect(comment).toHaveValue('Test appointment comment')
		})

		await test.step('Verify book appointment button is visible and enabled', async () => {
			const bookBtn = page.locator('#btn-book-appointment')
			await expect(bookBtn).toBeVisible()
			await expect(bookBtn).toBeEnabled()
		})
	})
})
