import clsx from 'clsx'
import {
    Smartphone as SmartphoneIcon,
    Computer as ComputerIcon
} from 'lucide-react'
import {
    ItemDefaultComponent,
    IProps as ItemDefaultProps
} from '@/components/ItemList'

import styles from './item-session.module.css'

interface IPropsWithoutLoading
    extends Pick<ItemDefaultProps, 'onClick' | 'description' | 'title'> {
    type: 'pc' | 'phone'
    isLoading?: false
}

interface IPropsWithLoading
    extends Partial<Omit<IPropsWithoutLoading, 'isLoading'>> {
    isLoading: true
}

type IProps = IPropsWithLoading | IPropsWithoutLoading

export const ItemSessionComponent = ({type, isLoading, ...rest}: IProps) => {
    const icon = (
        <div
            className={clsx(
                isLoading ? styles.wrapperIconLoading : styles.wrapperIcon,
                isLoading && 'skeletron-loader'
            )}
        >
            {type === 'pc' ? <ComputerIcon /> : <SmartphoneIcon />}
        </div>
    )

    return (
        <ItemDefaultComponent
            size='big'
            leftComponent={icon}
            isLoading={isLoading}
            {...rest}
        />
    )
}
