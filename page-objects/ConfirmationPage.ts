import { type Page, type Locator } from '@playwright/test'

export class ConfirmationPage {
	readonly page: Page
	readonly title: Locator
	readonly facility: Locator
	readonly hospitalReadmission: Locator
	readonly program: Locator
	readonly visitDate: Locator
	readonly comment: Locator

	constructor(page: Page) {
		this.page = page
		this.title = page.getByRole('heading', { name: 'Appointment Confirmation' })
		this.facility = page.locator('#facility')
		this.hospitalReadmission = page.locator('#hospital_readmission')
		this.program = page.locator('#program')
		this.visitDate = page.locator('#visit_date')
		this.comment = page.locator('#comment')
	}

	get getTitle(): Locator {
		return this.title
	}

	get getFacility(): Locator {
		return this.facility
	}

	get getHospitalReadmission(): Locator {
		return this.hospitalReadmission
	}

	get getProgram(): Locator {
		return this.program
	}

	get getVisitDate(): Locator {
		return this.visitDate
	}

	get getComment(): Locator {
		return this.comment
	}
}
