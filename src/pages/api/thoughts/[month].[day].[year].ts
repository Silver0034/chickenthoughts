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

	// For every day in the year, add a generic thought

	let thoughtIndex = 0

	for (let dateIndex = 0; dateIndex < 366; dateIndex++) {
		const date = new Date(year, 0, dateIndex)
		const formattedDate = formatDate(date)

		if (thoughts[formattedDate]) {
			continue
		}

		thoughts[formattedDate] = genericThoughts[thoughtIndex]

		thoughtIndex++
	}

	return thoughts
}

export async function GET(context: APIContext) {
	let { day, month, year } = context.params

	const response = {
		attribution: 'The Chicken. ChickenThoughts.com. All rights reserved.',
		date: 'unknown'
	}

	return new Response(
		JSON.stringify({
			message: 'It got this far.',
			params: context.params,
			timestamp: new Date().toISOString(),
			...response
		}),
		{ status: 422 }
	)
}
