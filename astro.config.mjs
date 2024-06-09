import { defineConfig } from 'astro/config'

import cloudflare from '@astrojs/cloudflare'

// https://astro.build/config
export default defineConfig({
	output: 'hybrid',
	image: {
		entrypoint: 'compile'
	},
	adapter: cloudflare({
		imageService: 'compile'
	}),
	platformProxy: {
		enabled: true,
		configPath: 'wrangler.toml'
	}
})
