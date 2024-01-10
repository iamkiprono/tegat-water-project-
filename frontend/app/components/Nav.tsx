import Link from 'next/link'
import React from 'react'

const Nav = () => {
  return (
    <div>
        <div className='flex justify-between items-center border p-6'>
            <div>
                <Link href={"/bills"}>
                Milimani Water Project
                </Link>

            </div>
            <div className='flex gap-4'>
                <Link href={"addfarmer"}>Add Farmer</Link>
                <Link href={"bills"}>Bills</Link>
                <Link href={"payments"}>Payments</Link>
            </div>
        </div>
    </div>
  )
}

export default Nav