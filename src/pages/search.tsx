import IDResult from '@/components/Search/IDResult';
import NameResult from '@/components/Search/NameResult';
import { Tabs } from '@mantine/core';
import { useRouter } from 'next/router';
import React from 'react'

const SearchPage = () => {

    const router = useRouter();

    const { q } = router.query;


    return (
        <main className="flex flex-col min-h-screen gap-3 p-5 pb-24">
            <h1 className="text-2xl font-bold text-zinc-700">Hasil pencarian untuk "{q}"</h1>
            <Tabs variant='pills' defaultValue="id" className="w-full">
                <Tabs.List className='mb-3'>
                    <Tabs.Tab className='flex-1' value="id" >ID BPOM</Tabs.Tab>
                    <Tabs.Tab className='flex-1' value="bahan" >Bahan</Tabs.Tab>
                    <Tabs.Tab className='flex-1' value="nama">Nama</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value='id' className="">
                    <h2 className="mb-2 text-xl font-medium text-zinc-700">Berdasarkan ID</h2>
                    <IDResult />
                </Tabs.Panel>
                <Tabs.Panel value='bahan' className="">
                    <h2 className="mb-2 text-xl font-medium text-zinc-700">Berdasarkan Bahan Aktif</h2>
                    {/* <NameResult /> */}
                </Tabs.Panel>
                <Tabs.Panel value='nama' className="">
                    <h2 className="mb-2 text-xl font-medium text-zinc-700">Berdasarkan Nama Produk</h2>
                    <NameResult />
                </Tabs.Panel>
            </Tabs>
        </main>
    )
}

export default SearchPage