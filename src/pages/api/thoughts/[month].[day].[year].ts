export const prerender = false

import type { APIContext } from 'astro'
// import genericThoughts from './generic-thoughts.js'
import { genericThoughts } from '../../../content/thoughts/generic.js'
import { holidayThoughts } from '../../../content/thoughts/holiday.js'

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

	const dateKey = formatDate(date)

	response.date = dateKey

	const thought = thoughts[dateKey]

	if (!thought) {
		return new Response(
			JSON.stringify({
				message: 'No thought found for this date.',
				...response
			}),
			{ status: 404 }
		)
	}

	return new Response(
		JSON.stringify({
			message: thought,
			...response
		}),
		{ status: 200 }
	)
}
