import type {NextRequest, NextFetchEvent} from 'next/server'
import {cookieConstant} from '@/constants/cookie.constant'
import {dashboardConstant} from '@/constants/dashboard.constant'

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get(cookieConstant.ACCESS_TOKEN)
    const refreshToken = request.cookies.get(cookieConstant.REFRESH_TOKEN)

    // const isExistTokens = !!(accessToken && refreshToken)
    const isExistTokens = !!accessToken
    const pathname = request.nextUrl.pathname

    if (
        // If user no auth and stay in app pages
        !isExistTokens &&
        pathname !== dashboardConstant.LOGIN_PAGE &&
        pathname !== dashboardConstant.REGISTER_PAGE
    ) {
        return Response.redirect(
            new URL(dashboardConstant.AUTH_PAGE, request.url)
        )
    } else if (
        // If user auth and stay in auth page
        isExistTokens &&
        (pathname === dashboardConstant.LOGIN_PAGE ||
            pathname === dashboardConstant.REGISTER_PAGE)
    ) {
        return Response.redirect(
            new URL(dashboardConstant.APP_PAGE, request.url)
        )
    }
}

export const config = {
    matcher: ['/app/:path*']
}
