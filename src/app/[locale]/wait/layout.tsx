export default async function WaitLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <main className='w-full h-full p-5 text-primaryInvert pt-20'>
            {children}
        </main>
    )
}
