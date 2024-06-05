import type {Config} from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
    future: {
        hoverOnlyWhenSupported: true
    },
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            animation: {
                blink: 'blink 1s infinite'
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
            },
            colors: {
                content: {
                    DEFAULT: 'rgb(var(--content-color))',
                    70: 'rgba(var(--content-color), .7)',
                    50: 'rgba(var(--content-color), .5)',
                    30: 'rgba(var(--content-color), .3)',
                    10: 'rgba(var(--content-color), .1)'
                },
                accent: {
                    DEFAULT: 'rgb(var(--accent-color))',
                    70: 'rgba(var(--accent-color), .7)',
                    50: 'rgba(var(--accent-color), .5)',
                    30: 'rgba(var(--accent-color), .3)',
                    10: 'rgba(var(--accent-color), .1)'
                },
                primary: {
                    DEFAULT: 'rgb(var(--primary-color))',
                    70: 'rgba(var(--primary-color), .7)',
                    50: 'rgba(var(--primary-color), .5)',
                    30: 'rgba(var(--primary-color), .3)',
                    10: 'rgba(var(--primary-color), .1)'
                },
                primaryInvert: {
                    DEFAULT: 'rgb(var(--primaryInvert-color))',
                    70: 'rgba(var(--primaryInvert-color), .7)',
                    50: 'rgba(var(--primaryInvert-color), .5)',
                    30: 'rgba(var(--primaryInvert-color), .3)',
                    10: 'rgba(var(--primaryInvert-color), .1)'
                },
                green: {
                    DEFAULT: 'rgb(var(--green-color))',
                    70: 'rgba(var(--green-color), .7)',
                    50: 'rgba(var(--green-color), .5)',
                    30: 'rgba(var(--green-color), .3)',
                    10: 'rgba(var(--green-color), .1)'
                },
                blue: {
                    DEFAULT: 'rgb(var(--blue-color))',
                    70: 'rgba(var(--blue-color), .7)',
                    50: 'rgba(var(--blue-color), .5)',
                    30: 'rgba(var(--blue-color), .3)',
                    10: 'rgba(var(--blue-color), .1)'
                }
            },
            fontSize: {
                '3xl-bold': ['2.375rem', {fontWeight: 'bold'}],
                '3xl-regular': ['2.375rem', {fontWeight: 'regular'}],
                '2xl-bold': ['1.5rem', {fontWeight: 'bold'}],
                '2xl-regular': ['1.5rem', {fontWeight: 'regular'}],
                'lg-bold': ['1.125rem', {fontWeight: 'bold'}],
                'lg-regular': ['1.125rem', {fontWeight: 'regular'}],
                'base-bold': ['1rem', {fontWeight: 'bold'}],
                'base-regular': ['1rem', {fontWeight: 'regular'}],
                'small-bold': ['0.875rem', {fontWeight: 'bold'}],
                'small-regular': ['0.875rem', {fontWeight: 'regular'}],
                'xs-bold': ['0.625rem', {fontWeight: 'bold'}],
                'xs-regular': ['0.625rem', {fontWeight: 'regular'}]
            },
            padding: {
                standard: '0.9375rem'
            },
            margin: {
                standard: '0.9375rem'
            },
            borderRadius: {}
        }
    },
    plugins: [
        plugin(({addUtilities}) => {
            const newUtilities = {
                '.transition-colors-custom': {
                    'transition-property':
                        'color, background-color, border-color, text-decoration-color, fill, stroke',
                    'transition-duration': '300ms',
                    'transition-timing-function': 'ease-in-out'
                }
            }

            addUtilities(newUtilities)
        })
    ]
}
export default config
