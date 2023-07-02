import SearchItem from '@/components/SearchItem';
import { MedicineType } from '@/typings/app';
import { Tabs } from '@mantine/core';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react'

const SearchPage = () => {

    const router = useRouter();

    const { q } = router.query;

    console.log(q)

    const obats: MedicineType[] = [
        { "product_id": "EREG10037412300028", "application_id": "05", "class_id": "01", "product_register": "DBL1441200233A1", "product_date": "Terbit: 25-06-2023", "product_name": "MYLANTA", "product_brands": "Merk: -", "product_package": "Kemasan: BOTOL PLASTIK @ 50 ML", "pendaftar": "INTEGRATED HEALTHCARE INDONESIA - Indonesia", "alamat_pendaftar": "-", "status": "Berlakus/d 25-06-2028", "details": { "tanggal_terbit": "25-06-2023", "diterbitkan_oleh": "Registrasi Obat", "produk": "Obat", "bentuk_sediaan": "SUSPENSI; 1075.500 MG /666.700 MG /66.600 MG", "komposisi": ["ALUMINIUM HYDROXIDE GEL", "MAGNESIUM HYDROXIDE PASTE", "SIMETHICONE EMULSION 30"], "merk": "-", "masa_berlaku": "25-06-2028" } }
    ]

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
                    <h2 className="text-xl font-medium text-zinc-700">Berdasarkan ID</h2>
                    <div className="flex flex-col items-center justify-center">
                        <Image src="/not-found.svg" width={300} height={300} alt="Not Found" className="mx-auto" />
                        <p className='-mt-16 font-semibold'>
                            Hasil tak ditemukan
                        </p>
                    </div>
                </Tabs.Panel>
                <Tabs.Panel value='bahan' className="">
                    <h2 className="text-xl font-medium text-zinc-700">Berdasarkan Bahan Aktif</h2>
                    <div className="flex flex-col items-center justify-center">
                        <Image src="/not-found.svg" width={300} height={300} alt="Not Found" className="mx-auto" />
                        <p className='-mt-16 font-semibold'>
                            Hasil tak ditemukan
                        </p>
                    </div>
                </Tabs.Panel>
                <Tabs.Panel value='nama' className="">
                    <h2 className="text-xl font-medium text-zinc-700">Berdasarkan Nama Produk</h2>
                    <ul>
                        {
                            obats.map((obat, index) => (
                                <li key={index}>
                                    <SearchItem {...obat} />
                                </li>
                            ))
                        }
                    </ul>
                </Tabs.Panel>
            </Tabs>
        </main>
    )
}

export default SearchPage