"use client"

import PageNavbar, { PageNavbarLeftContent, PageNavbarRightContent } from '@/components/layout/PageNavbar'
import { Profile } from 'iconsax-react'
import ListUsers from '@/components/ListUsers'
import PageContent from '@/components/Layout/PageContent'
function Page() {

    


    return (
        <div className='text-gray-500 w-full'>
            <PageNavbar>
                <PageNavbarLeftContent>
                    <div className='border rounded-full w-10 h-10 all-center'>
                        {/* <Setting4 size={18} /> */}
                        <Profile size={18} />
                    </div>
                    <div>
                        <h1 className='text-sm font-semibold text-gray-800'>User Access</h1>
                        <p className='text-xs font-medium'>Manage and collaborate within your organization&apos;s teams</p>
                    </div>
                </PageNavbarLeftContent>

                <PageNavbarRightContent>
                </PageNavbarRightContent>
            </PageNavbar>

            <PageContent>
                {/* header */}
                <div className='text-sm md:pb-2 flex items-center justify-between'>
                    <div>
                        <h1 className='text-gray-800 font-medium'>Available integrations</h1>
                        <p className='text-xs'>Display all the team members and essential details</p>
                    </div>

                    <div className='flex gap-2'>
                    </div>
                </div>

                <hr className='-mx-4' />

                {/* users table */}
                <ListUsers />

            </PageContent>

        </div>
    )
}

export default Page