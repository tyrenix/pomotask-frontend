'use client'

import {dashboardConstant} from '@/constants/dashboard.constant'
import {useRouter} from 'next/navigation'

export default function IndexPage() {
    const router = useRouter()
    router.replace(dashboardConstant.APP_PAGE)
}
