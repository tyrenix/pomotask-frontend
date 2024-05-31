interface IProps {
    backgroundColor?: string
    className?: string
}

const LogoComponent = (props: IProps) => {
    return (
        <svg
            className={props.className}
            width='1024'
            height='1024'
            viewBox='0 0 1024 1024'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <rect
                width='1024'
                height='1024'
                rx='155'
                fill={props.backgroundColor || 'white'}
            />
            <path
                className='stroke-accent'
                d='M762 512C762 561.445 747.338 609.78 719.867 650.893C692.397 692.005 653.352 724.048 607.671 742.97C561.989 761.892 511.723 766.843 463.227 757.196C414.732 747.55 370.186 723.74 335.223 688.777C300.26 653.814 276.45 609.268 266.804 560.773C257.157 512.277 262.108 462.011 281.03 416.329C299.952 370.648 331.995 331.603 373.107 304.133C414.22 276.662 462.555 262 512 262'
                strokeWidth='105'
                strokeMiterlimit='16'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                className='fill-primaryInvert-70'
                d='M701.525 320.691C703.296 319.673 705.274 321.652 704.256 323.422L580.271 538.966C579.615 540.107 578.054 540.314 577.123 539.383L485.564 447.824C484.633 446.893 484.84 445.332 485.981 444.676L701.525 320.691Z'
            />
            <circle className='fill-primary' cx='512' cy='512' r='80' />
            <circle
                className='fill-primaryInvert-70'
                cx='512'
                cy='512'
                r='70'
            />
            <rect
                x='508'
                y='40'
                width='10'
                height='100'
                rx='2'
                className='fill-primaryInvert-30'
            />
            <rect
                x='508'
                y='884'
                width='10'
                height='100'
                rx='2'
                className='fill-primaryInvert-30'
            />
            <rect
                x='843.219'
                y='174.71'
                width='10'
                height='100'
                rx='2'
                transform='rotate(45 843.219 174.71)'
                className='fill-primaryInvert-30'
            />
            <rect
                x='246.421'
                y='771.508'
                width='10'
                height='100'
                rx='2'
                transform='rotate(45 246.421 771.508)'
                className='fill-primaryInvert-30'
            />
            <rect
                x='175.71'
                y='181.781'
                width='10'
                height='100'
                rx='2'
                transform='rotate(-45 175.71 181.781)'
                className='fill-primaryInvert-30'
            />
            <rect
                x='772.508'
                y='778.579'
                width='10'
                height='100'
                rx='2'
                transform='rotate(-45 772.508 778.579)'
                className='fill-primaryInvert-30'
            />
            <rect
                x='985'
                y='507'
                width='10'
                height='100'
                rx='2'
                transform='rotate(90 985 507)'
                className='fill-primaryInvert-30'
            />
            <rect
                x='141'
                y='507'
                width='10'
                height='100'
                rx='2'
                transform='rotate(90 141 507)'
                className='fill-primaryInvert-30'
            />
        </svg>
    )
}

export default LogoComponent
