import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { } from 'react'
import axios from 'axios'
import SearchItem from '../SearchItem';

const IDResult = () => {

    const router = useRouter();

    const { q } = router.query;

    const { data, isLoading } = useQuery({
        queryFn: async () => {
            const res = await axios.get(`/bpom/products/${q}`);
            return await res.data;
        },
        queryKey: ["id-result", q]
    })

    if (isLoading) {
        return (
            <h1>Loading</h1>
        )
    }

    return (
        <>
            {data ?
                <SearchItem {...(data)} />
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

export default IDResult