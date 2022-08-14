const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#D92344',
					'primary-content': '#F2F2F2',

					secondary: '#042626',

					accent: '#4C5958',

					neutral: '#A6A39F',

					'base-100': '#F2F2F2',

					info: '#3ABFF8',

					success: '#36D399',

					warning: '#FBBD23',

					error: '#F87272'
				}
			},
			'dark',
			'light'
		]
	},

	plugins: [require('daisyui'), require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio')]
};

module.exports = config;
