'use client'

import {useRouter} from 'next/navigation'
import {dashboardConstant} from '@/constants/dashboard.constant'

export default function MainPage() {
    // const {data, error} = useQuery<ITask[], string, ITask[], QueryKey>({
    //     queryKey: ['tasks'],
    //     queryFn: () => taskService.getAllTasks()
    // })
    //
    // useEffect(() => {
    //     if (error) {
    //         toast.error(error)
    //     }
    // }, [error])
    //
    // return <h1>data: {JSON.stringify(data || {message: 'not found!'})}</h1>

    const router = useRouter()
    router.replace(dashboardConstant.PROFILE_PAGE)

    return null
}
