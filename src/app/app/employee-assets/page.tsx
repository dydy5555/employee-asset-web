"use client"

import PageNavbar, { PageNavbarLeftContent, PageNavbarRightContent } from '@/components/layout/PageNavbar'
import { Buildings, Profile } from 'iconsax-react'
import ListUsers from '@/components/ListUsers'
import PageContent from '@/components/Layout/PageContent'
function Page() {

    


    return (
        <div className='text-gray-500 w-full px-10 py-10'>
                {/* users table */}
                <p className='text-lg font-medium  text-black border-b-[0.5px] pb-5 mb-5'> <Buildings size="32" color="#FF8A65"/> Assets Employee</p>
                <ListUsers />
        </div>
    )
}

export default Page