import clsx from 'clsx'
import DeviceDetector from 'device-detector-js'
import {
    Smartphone as SmartphoneIcon,
    Computer as ComputerIcon,
    ShieldQuestion as ShieldQuestionIcon
} from 'lucide-react'
import {
    ItemDefaultComponent,
    IProps as ItemDefaultProps
} from '@/components/ItemList'
import type {ISession} from '@/types/session.types'

import styles from './item-session.module.css'

interface IPropsWithoutLoading extends Pick<ItemDefaultProps, 'onClick'> {
    session: ISession
    isLoading?: false
}

interface IPropsWithLoading
    extends Partial<Omit<IPropsWithoutLoading, 'isLoading'>> {
    isLoading: true
}

type IProps = IPropsWithLoading | IPropsWithoutLoading

export const ItemSessionComponent = ({session, isLoading, ...rest}: IProps) => {
    const deviceDetect = new DeviceDetector().parse(session?.userAgent || '')
    const agent = deviceDetect.device?.type || undefined

    const icon = (
        <div
            className={clsx(
                isLoading ? styles.wrapperIconLoading : styles.wrapperIcon,
                isLoading && 'skeletron-loader'
            )}
        >
            {agent === 'desktop' ? (
                <ComputerIcon />
            ) : agent === 'smartphone' ? (
                <SmartphoneIcon />
            ) : (
                <ShieldQuestionIcon />
            )}
        </div>
    )

    const description = [
        deviceDetect.device?.brand || '',
        `${deviceDetect.os?.name || ''} ${
            deviceDetect.os?.version || ''
        }`.trim(),
        `${deviceDetect.client?.name || ''} ${deviceDetect.client?.version}`
    ]
        .join(', ')
        .trim()

    return (
        <ItemDefaultComponent
            size='big'
            title={session?.ip || ''}
            description={description}
            leftComponent={icon}
            isLoading={isLoading}
            {...rest}
        />
    )
}
