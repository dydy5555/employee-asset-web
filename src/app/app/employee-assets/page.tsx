"use client"

import { Buildings, Profile } from 'iconsax-react'
import ListUsers from '@/components/ListUsers'
import PageContent from '@/components/Layout/PageContent'
function Page() {

    


    return (
        <div className='text-gray-500 w-full px-10 '>
                {/* users table */}
                <p className='text-lg font-medium pt-10 text-black border-b-[0.5px] pb-5 mb-5 flex gap-3 items-end' > <Buildings size="32" color="#FF8A65"/>  Employee</p>
                <ListUsers />
        </div>
    )
}

export default Page