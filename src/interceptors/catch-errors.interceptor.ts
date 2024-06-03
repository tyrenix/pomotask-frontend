export const catchErrorsInterceptor = (err: any) => {
    const message = err?.response?.data?.message
    throw message
        ? typeof err?.response?.data?.message === 'object'
            ? message[0]
            : message
        : err?.message
}
