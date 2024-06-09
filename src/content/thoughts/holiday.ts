function getEasterSunday(year: number) {
	const a = year % 19
	const b = Math.floor(year / 100)
	const c = year % 100
	const d = Math.floor(b / 4)
	const e = b % 4
	const f = Math.floor((b + 8) / 25)
	const g = Math.floor((b - f + 1) / 3)
	const h = (19 * a + b - d - g + 15) % 30
	const i = Math.floor(c / 4)
	const k = c % 4
	const l = (32 + 2 * e + 2 * i - h - k) % 7
	const m = Math.floor((a + 11 * h + 22 * l) / 451)
	const month = Math.floor((h + l - 7 * m + 114) / 31)
	const day = ((h + l - 7 * m + 114) % 31) + 1

	return new Date(year, month - 1, day)
}

export const holidayThoughts: { thought: string; date: Function }[] = [
	{
		thought:
			"New Year, same old me—just a little wiser and a little featherier. Let's make this year egg-ceptional!",
		date: (year: number) => new Date(year, 0, 1)
	},
	{
		thought:
			"Happy Inauguration Day! Let's peck out a plan for a coop where every chicken thrives!",
		date: (year: number) => {
			let selectedYear = year

			while ((selectedYear - 1) % 4 !== 0) {
				selectedYear++
			}

			return new Date(selectedYear, 0, 20)
		}
	},
	{
		thought:
			"As we honor Martin Luther King Jr.'s legacy, let's strive to create a world where everyone can peacefully scratch and peck together in harmony.",
		date: (year: number) => {
			// Get the third monday in january
			const date = new Date(year, 0, 1)
			date.setDate(1 + ((1 + 7 - date.getDay()) % 7) + 14)
			return date
		}
	},
	{
		thought:
			'Snuggle up, buttercup! National Snuggle a Chicken Day is all about spreading warmth, happiness, and chicken cuddles wherever we go.',
		date: (year: number) => new Date(year, 0, 8)
	},
	{
		thought:
			"Happy President's Day! If chickens ran the world, we'd have a lot more nap time!",
		date: (year: number) => {
			// Get the third monday in february
			const date = new Date(year, 1, 1)
			date.setDate(1 + ((1 + 7 - date.getDay()) % 7) + 14)
			return date
		}
	},
	{
		thought:
			"Happy National Poultry Day! I'm egg-cited to be celebrated today!",
		date: (year: number) => new Date(year, 2, 19)
	},
	{
		thought:
			'For Good Friday, I offer my song to the heavens, a humble melody of gratitude for the abundance of the earth and the love of my fellow chickens.',
		date: (year: number) => {
			const easterSunday = getEasterSunday(year)
			const goodFriday = new Date(easterSunday).setDate(
				easterSunday.getDate() - 2
			)
			return new Date(goodFriday)
		}
	},
	{
		thought:
			'Easter Bunny, step aside! Us chickens are ready to take over the egg-hiding duties. Happy Easter, everyone!',
		date: (year: number) => getEasterSunday(year)
	},
	{
		thought:
			'Take some time today to honor all who have served to protect our communities and coops.',
		date: (year: number) => {
			// Get the last monday in may
			const date = new Date(year, 4, 31)
			date.setDate(date.getDate() - ((date.getDay() + 6) % 7))
			return date
		}
	},
	{
		thought:
			'On Juneteenth, we honor the courageous individuals who fought for equality and freedom. Their resilience inspires us to continue the journey toward a more just and inclusive world for all.',
		date: (year: number) => new Date(year, 5, 19)
	},
	{
		thought:
			"On this egg-stra special Independence Day, let's strut our stuff and show the world that chickens know how to party! Let's wing it and have a beak-tacular celebration!",
		date: (year: number) => new Date(year, 6, 4)
	},
	{
		thought:
			"Wait, what? National Chicken Finger Day? But... I don't even have fingers! Do humans think we're just walking around with breaded digits or something? This is egg-stremely confusing!",
		date: (year: number) => new Date(year, 6, 27)
	},
	{
		thought:
			"Hold up, Labor Day? But... I don't even get weekends off! Do humans think we're clocking in and out of some poultry office or something? This is egg-stremely confusing!",
		date: (year: number) => {
			// Get the first monday in september
			const date = new Date(year, 8, 1)
			date.setDate(1 + ((1 + 7 - date.getDay()) % 7))
			return date
		}
	},
	{
		thought:
			"So apparently it's Colonel Sanders' birthday... Does this mean humans are celebrating their... um, chicken dinners? I'm not sure whether to be flattered or flustered. Either way, I'm just gonna keep on pecking.",
		date: (year: number) => new Date(year, 8, 9)
	},
	{
		thought:
			'Columbus Day? I wonder if Columbus ever had to evade a hungry hawk while sailing the high seas.',
		date: (year: number) => {
			// Get the second monday in october
			const date = new Date(year, 9, 1)
			date.setDate(1 + ((1 + 7 - date.getDay()) % 7) + 7)
			return date
		}
	},
	{
		thought:
			"Happy Halloween! Let's celebrate by setting up some spooky decorations in the coop and seeing who's brave enough to enter.",
		date: (year: number) => new Date(year, 9, 31)
	},
	{
		thought:
			"Happy All Saints' Day! Feeling egg-stra blessed and protected today!",
		date: (year: number) => new Date(year, 10, 1)
	},
	{
		thought:
			"Happy All Souls' Day! Today, we cluck in memory of our dearly departed feathered friends.",
		date: (year: number) => new Date(year, 10, 2)
	},
	{
		thought:
			"Happy Veteran's Day! Remembering the heroes who have kept our coop safe and sound.",
		date: (year: number) => new Date(year, 10, 11)
	},
	{
		thought:
			"Happy Thanksgiving! I'm thankful for all the corn and cozy nests!",
		date: (year: number) => {
			// Get the fourth thursday in november
			const date = new Date(year, 10, 1)
			date.setDate(1 + ((4 - date.getDay() + 7) % 7) + 21)
			return date
		}
	},
	{
		thought:
			'Merry Christmas Eve! Wishing for a stocking full of tasty treats!',
		date: (year: number) => new Date(year, 11, 24)
	},
	{
		thought: 'Merry Christmas! Feeling egg-stra loved and festive today!',
		date: (year: number) => new Date(year, 11, 25)
	},
	{
		thought:
			'Bawk bawk! Feeling egg-cited for all the clucking adventures the New Year will bring!',
		date: (year: number) => new Date(year, 11, 31)
	}
]
