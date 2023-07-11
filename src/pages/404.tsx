import { Button } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NotFoundPage = () => {
    return (
        <main className="flex flex-col items-center justify-center w-full h-screen gap-3">
            <p className='-mt-16 font-medium'>
                Hasil tak ditemukan
            </p>
            <Image src="/not-found.svg" width={300} height={300} alt="Not Found" className="mx-auto" />
            <Link href="/">
                <Button className='bg-green-600'>Kembali ke Beranda</Button>
            </Link>
        </main>
    )
}

export default NotFoundPage