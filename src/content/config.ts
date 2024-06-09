// Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content'

const jokeCollection = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			image: image(),
			imageAlt: z.string(),
			tags: z.array(z.string())
		})
})

// Export a single `collections` object to register your collection(s)
export const collections = {
	jokes: jokeCollection
}
