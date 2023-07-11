import { MedicineType } from '@/typings/app'
import { Badge } from '@mantine/core'
import Link from 'next/link'
import React from 'react'

const SearchItem = ({
    PRODUCT_REGISTER,
    PRODUCT_NAME,
    details
}: MedicineType) => {
    return (
        <Link href={`/medicines/${PRODUCT_REGISTER}`} className='flex items-center justify-between gap-3 p-3 rounded-md shadow'>
            <p className='text-xs'>{PRODUCT_NAME}</p>
            {/* <Badge
                    color='primary'
                    variant='outline'
                >
                    {details?.produk ?? 'Produk'}
                </Badge> */}
        </Link>
    )
}

export default SearchItem