"use client"

import { redirect } from 'next/navigation'

function Home() {
  redirect('app/employee-assets')
}

export default Home