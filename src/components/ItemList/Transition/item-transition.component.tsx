import Link from 'next/link'
import {
    IProps as ItemDefaultProps,
    ItemDefaultComponent
} from '@/components/ItemList/Default/item-default.component'
import {ChevronRight} from 'lucide-react'

interface IProps
    extends Pick<
        ItemDefaultProps,
        'title' | 'onClick' | 'leftComponent' | 'size' | 'isLoading'
    > {
    href?: string
}

export const ItemTransitionComponent = ({href, ...rest}: IProps) => {
    const rightComponent = !rest.isLoading && (
        <ChevronRight className='h-8 w-8 text-primaryInvert-70' />
    )

    if (href) {
        return (
            <Link href={href}>
                <ItemDefaultComponent
                    rightComponent={rightComponent}
                    {...rest}
                />
            </Link>
        )
    }

    return <ItemDefaultComponent rightComponent={rightComponent} {...rest} />
}
