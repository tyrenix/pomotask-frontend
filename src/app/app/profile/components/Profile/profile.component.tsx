'use client'

import {ListComponent} from '@/components/List/list.component'
import * as ItemList from '@/components/ItemList'

export const ProfileComponent = () => {
    return (
        <>
            <ListComponent>
                <ItemList.ItemAvatarComponent isLoading={true} />
                <ItemList.ItemTransitionComponent
                    size='small'
                    isLoading={true}
                />
            </ListComponent>
            <ListComponent title='Pomodoro sessions'>
                <ItemList.ItemTransitionComponent size='big' isLoading={true} />
                <ItemList.ItemTransitionComponent size='big' isLoading={true} />
                <ItemList.ItemTransitionComponent
                    size='small'
                    isLoading={true}
                />
            </ListComponent>
        </>
    )
}
