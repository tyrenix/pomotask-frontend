import createNextIntlPlugin from 'next-intl/plugin'
import PWA from '@ducanh2912/next-pwa'

const withNextIntlPlugin = createNextIntlPlugin()
const withPWA = PWA({
    fallbacks: {
        document: '/offline'
    }
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: config => {
        config.module.rules
            .find(({oneOf}) => !!oneOf)
            .oneOf.filter(({use}) =>
                JSON.stringify(use)?.includes('css-loader')
            )
            .reduce((acc, {use}) => acc.concat(use), [])
            .forEach(({options}) => {
                if (options.modules) {
                    options.modules.exportLocalsConvention = 'camelCase'
                }
            })

        return config
    }
}

export default withNextIntlPlugin(nextConfig)
