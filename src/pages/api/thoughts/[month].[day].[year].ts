export const prerender = false

import type { APIContext } from 'astro'
import genericThoughts from './generic-thoughts.js'
import holidayThoughts from './holiday-thoughts.js'

// There are 23 holidays listed. I need 343 generic thoughts

function formatDate(date: Date) {
	return `${date.getFullYear()}-${(date.getMonth() + 1)
		.toString()
		.padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

function getThoughts(year: number) {
	const thoughts: { [key: string]: string } = {}

	// Add each holiday to thoughts
	holidayThoughts.forEach((holiday) => {
		const date = holiday.date(year)
		const formattedDate = formatDate(date)
		const thought = holiday.thought

		thoughts[formattedDate] = thought
	})

	return thoughts
}

export async function GET(context: APIContext) {
	let { day, month, year } = context.params

	const response = {
		attribution: 'The Chicken. ChickenThoughts.com. All rights reserved.',
		date: 'unknown'
	}

	if (!day || !month || !year) {
		return new Response(
			JSON.stringify({
				message: 'Invalid date. Use format mm.dd.yyyy.',
				...response
			}),
			{ status: 422 }
		)
	}

	const date = new Date(`${year}-${month}-${day}`)

	// Stop if the date is invalid
	if (isNaN(date.getTime())) {
		return new Response(
			JSON.stringify({
				message: 'Invalid date. Use format mm.dd.yyyy.',
				...response
			}),
			{ status: 422 }
		)
	}

	const thoughts = getThoughts(date.getFullYear())

	return new Response(
		JSON.stringify({
			message: 'Getting closer.',
			passedDate: `${year}-${month}-${day}`,
			thoughts: thoughts,
			...response
		}),
		{ status: 422 }
	)
}
