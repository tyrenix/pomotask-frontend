import type {NextRequest} from 'next/server'
import {dashboardConstant} from '@/constants/dashboard.constant'
import {cookieConstant} from '@/constants/cookie.constant'
import {envConstant} from './constants/env.constant'

export function middleware(request: NextRequest) {
    const refreshToken = request.cookies.get(
        cookieConstant.REFRESH_TOKEN
    )?.value
    const pathname = request.nextUrl.pathname

    if (envConstant.NEXT_PUBLIC_IS_DEV !== 'YES') {
        if (
            // If user no auth and stay in app pages
            !refreshToken &&
            !pathname.includes(dashboardConstant.PREFIX_AUTH_PAGE)
        ) {
            return Response.redirect(
                new URL(dashboardConstant.AUTH_PAGE, request.url)
            )
        } else if (
            // If user auth and stay in auth page
            refreshToken &&
            pathname.includes(dashboardConstant.PREFIX_AUTH_PAGE)
        ) {
            return Response.redirect(
                new URL(dashboardConstant.APP_PAGE, request.url)
            )
        }
    }
}

export const config = {
    matcher: ['/auth/:path*', '/app/:path*']
}
