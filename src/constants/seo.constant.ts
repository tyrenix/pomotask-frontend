import {Icon, Icons, IconURL} from 'next/dist/lib/metadata/types/metadata-types'

class SeoConstant {
    readonly NO_INDEX_PAGE = {robots: {index: false, follow: false}}
    readonly ICONS: IconURL | Array<Icon> | Icons = {
        icon: [
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                url: '/icons/favicon-16x16.png'
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                url: '/icons/favicon-32x32.png'
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '192x192',
                url: '/icons/favicon-192x192.png'
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '512x512',
                url: '/icons/favicon-512x512.png'
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '1024x1024',
                url: '/icons/favicon-1024x1024.png'
            },
            {
                rel: 'apple-touch-icon',
                type: 'image/png',
                sizes: '180x180',
                url: '/icons/favicon-180x180.png'
            }
        ],
        other: [{rel: 'icon', type: 'image/svg+xml', url: '/icons/favicon.svg'}]
    }
}

export const seoConstants = new SeoConstant()
