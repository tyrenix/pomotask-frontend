import {useEffect, useState} from 'react'

interface IProps {
    readonly timeout?: number
}

export const useStatusView = (props?: IProps) => {
    const [statusShow, setStatusShow] = useState<
        'show' | 'showing' | 'closing' | 'close'
    >('close')

    useEffect(() => {
        if (statusShow === 'closing')
            setTimeout(() => setStatusShow('close'), props?.timeout || 300)
        else if (statusShow === 'showing')
            setTimeout(() => setStatusShow('show'), props?.timeout || 300)
    }, [statusShow, props?.timeout])

    return {statusShow, setStatusShow}
}
