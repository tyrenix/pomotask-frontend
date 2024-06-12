import {clsx} from 'clsx'
import {
    IProps as ItemDefaultProps,
    ItemDefaultComponent
} from '@/components/ItemList/'

import styles from './item-avatar.module.css'

interface IPropsWithoutLoading
    extends Pick<ItemDefaultProps, 'title' | 'description' | 'onClick'> {
    avatar: string
    isLoading?: false
}

interface IPropsWithLoading
    extends Partial<Omit<IPropsWithoutLoading, 'isLoading'>> {
    isLoading: true
}

export const ItemAvatarComponent = ({
    avatar,
    ...rest
}: IPropsWithLoading | IPropsWithoutLoading) => {
    const avatarComponent = (
        <div
            className={clsx(
                styles.wrapperAvatar,
                rest.isLoading && 'skeletron-loader'
            )}
        >
            {
                // eslint-disable-next-line @next/next/no-img-element
                !rest.isLoading && <img src={avatar} alt='avatar' />
            }
        </div>
    )

    return (
        <ItemDefaultComponent
            leftComponent={avatarComponent}
            size='ultra-big'
            {...rest}
        />
    )
}
