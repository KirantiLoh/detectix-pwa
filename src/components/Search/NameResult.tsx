import Image from 'next/image';
import React from 'react'
import SearchItem from '../SearchItem';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MedicineType } from '@/typings/app';

const NameResult = () => {

    const router = useRouter();

    const { q } = router.query;

    const { data, isLoading } = useQuery<MedicineType[]>({
        queryFn: async () => {
            const res = await axios.get(`/api/bpom/search/${q}`);
            return await res.data;
        },
        queryKey: ["id-result", q],
        retry: 0,
    })

    if (isLoading) {
        return (
            <h1>Loading</h1>
        )
    }

    console.log(data)
    return (
        <>
            {data && data.length > 0 ?
                <ul className="flex flex-col gap-3">
                    {data.map((obat, index) => (
                        <SearchItem {...(obat)} key={index} />
                    ))}
                </ul>
                :
                <div className="flex flex-col items-center justify-center">
                    <Image src="/not-found.svg" width={300} height={300} alt="Not Found" className="mx-auto" />
                    <p className='-mt-16 font-semibold'>
                        Hasil tak ditemukan
                    </p>
                </div>}
        </>
    )
}
export default NameResult