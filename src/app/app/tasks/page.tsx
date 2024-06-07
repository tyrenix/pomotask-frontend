import {Metadata} from 'next'
import {getLocale, getTranslations} from 'next-intl/server'
import {TaskView} from './task-view.component'

export const generateMetadata = async (): Promise<Metadata> => {
    const locale = await getLocale()
    const t = await getTranslations({
        locale,
        namespace: 'Tasks'
    })

    return {
        title: t('title')
    }
}

export default function ProfilePage() {
    return <TaskView />
}
