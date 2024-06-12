'use server'

import {dashboardConstant} from '@/constants/dashboard.constant'
import {redirect} from 'next/navigation'

const MainPage = () => {
    redirect(dashboardConstant.APP_PAGE)
}

export default MainPage
