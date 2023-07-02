import { MedicineType } from '@/typings/app'
import { Badge } from '@mantine/core'
import Link from 'next/link'
import React from 'react'

const SearchItem = ({
    product_id,
    product_name,
    details
}: MedicineType) => {
    return (
        <Link href={`/medicines/${product_id}`}>
            <div className='flex items-center justify-between p-3 rounded-md shadow'>
                <h3>{product_name}</h3>
                <Badge
                    color='primary'
                    variant='outline'
                >
                    {details.produk}
                </Badge>
            </div>
        </Link>
    )
}

export default SearchItem