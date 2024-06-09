'use client'

import {usePathname} from 'next/navigation'
import {dashboardConstant} from '@/constants/dashboard.constant'

type ActivePageType = 'profile' | 'pomodoro' | 'tasks' | undefined

export const useActivePage = () => {
    const pathname = usePathname()
    let activePage: ActivePageType
    if (pathname.includes(dashboardConstant.PROFILE_PAGE)) {
        activePage = 'profile'
    } else if (pathname.includes(dashboardConstant.TASKS_PAGE)) {
        activePage = 'tasks'
    } else if (pathname.includes(dashboardConstant.POMODORO_PAGE)) {
        activePage = 'pomodoro'
    }

    return activePage
}
