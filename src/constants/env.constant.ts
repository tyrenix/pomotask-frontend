class EnvConstant {
    readonly NEXT_PUBLIC_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN
    readonly NEXT_PUBLIC_NEXT_HOST = process.env.NEXT_PUBLIC_NEXT_HOST
    readonly NEXT_PUBLIC_API_HOST = process.env.NEXT_PUBLIC_API_HOST
    readonly NEXT_PUBLIC_IS_DEV = process.env.NEXT_PUBLIC_IS_DEV
}

export const envConstant = new EnvConstant()
