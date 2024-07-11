import Dashboard from '@/components/Dashboard/Dashboard'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React from 'react'

export default function Home() {
  return (
    <div className='p-10'>
      {/* <DefaultLayout> */}
        <Dashboard />
      {/* </DefaultLayout> */}
    </div>
  )
}
