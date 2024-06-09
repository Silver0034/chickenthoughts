import { defineConfig } from 'astro/config'

import cloudflare from '@astrojs/cloudflare'

// https://astro.build/config
export default defineConfig({
	image: {
		entrypoint: 'compile'
	},
	output: 'hybrid',
	adapter: cloudflare()
})
