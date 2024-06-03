'use server'

import {redirect} from 'next/navigation'

const MainPage = () => {
    redirect('/wait')
}

export default MainPage
