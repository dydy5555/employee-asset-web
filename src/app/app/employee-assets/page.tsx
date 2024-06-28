"use client"

import PageNavbar, { PageNavbarLeftContent, PageNavbarRightContent } from '@/components/layout/PageNavbar'
import { Profile } from 'iconsax-react'
import ListUsers from '@/components/ListUsers'
import PageContent from '@/components/Layout/PageContent'
function Page() {

    


    return (
        <div className='text-gray-500 w-full'>
                {/* users table */}
                <ListUsers />
        </div>
    )
}

export default Page