'use client'
import React from 'react'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

export function Navbar() {
  const router = useRouter()

  const pathname = usePathname()

  if (pathname.startsWith('/certificate/')) {
    return <></>
  }

  return (
    <nav className="w-full md:flex justify-between space-y-4 items-center py-4 h-[12vh] ">
      <span
        onClick={() => router.push('/')}
        className=" cursor-pointer flex items-center justify-center gap-4 xl:ml-8 md:ml-4 ml-2"
      >
        <h1 className="md:text-3xl !underline text-xl secondary_gradient font-bold ">
          100xDevs Cohort Certificates
        </h1>
      </span>
      <span className="flex items-center justify-center gap-4">
        <Link href={'/generate'}>
          <button className="btn_primary_1">Generate Certificate</button>
        </Link>
        <Link href={'/verify'}>
          <button className="btn_primary_1">Verify Certificate</button>
        </Link>
        <a href="https://harkirat.classx.co.in/new-courses/2" target="_blank">
          <button className="btn_secondary_2">Go to cohort</button>
        </a>
      </span>
    </nav>
  )
}
