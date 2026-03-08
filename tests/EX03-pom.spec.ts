import { test, expect } from '../fixture'
import { ConfirmationPage } from '../page-objects/ConfirmationPage'

test.describe('Make Appointment Successfully', () => {
	const URL = process.env.URL || ''
	const USERNAME = process.env.TEST_USERNAME || ''
	const PASSWORD = process.env.TEST_PASSWORD || ''

	const currentDate = new Date().toLocaleDateString('en-GB', {
		timeZone: 'Asia/Bangkok',
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	})
	const facility = 'Hongkong CURA Healthcare Center'
	const readmission = true
	const program = 'Medicaid'
	const visitDate = currentDate
	const comment = 'This is a test appointment.'

	test.beforeEach(async ({ indexPage, loginPage, page }) => {
		await page.goto(URL)
		await indexPage.clickMakeAppointment()
		await loginPage.inputLoginForm(USERNAME, PASSWORD)

		await expect(page.locator('#appointment')).toBeVisible()
	})

	test('Make an appointment successfully', async ({
		appointmentPage,
		confirmationPage,
	}) => {
		await appointmentPage.inputAppointmentForm({
			facility: facility,
			hospitalReadmission: readmission,
			program: program,
			visitDate: visitDate,
			comment: comment,
		})

		await expect(confirmationPage.getFacility).toHaveText(facility)
		await expect(confirmationPage.getHospitalReadmission).toHaveText(
			readmission ? 'Yes' : 'No'
		)
		await expect(confirmationPage.getProgram).toHaveText(program)
		await expect(confirmationPage.getVisitDate).toHaveText(visitDate)
		await expect(confirmationPage.getComment).toHaveText(comment)
	})
})
