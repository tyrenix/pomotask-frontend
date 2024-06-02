class EnvConstant {
    readonly DOMAIN = process.env.DOMAIN
    readonly NEXT_HOST = process.env.NEXT_HOST
    readonly API_HOST = process.env.API_HOST
}

export const envConstant = new EnvConstant()
