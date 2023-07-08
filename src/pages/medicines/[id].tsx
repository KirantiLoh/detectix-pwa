import { Accordion } from '@mantine/core'
import React from 'react'

const MedicineByIdPage = () => {

    const obat = { "product_id": "EREG10037412300028", "application_id": "05", "class_id": "01", "product_register": "DBL1441200233A1", "product_date": "Terbit: 25-06-2023", "product_name": "MYLANTA", "product_brands": "Merk: -", "product_package": "Kemasan: BOTOL PLASTIK @ 50 ML", "pendaftar": "INTEGRATED HEALTHCARE INDONESIA - Indonesia", "alamat_pendaftar": "-", "status": "Berlakus/d 25-06-2028", "details": { "tanggal_terbit": "25-06-2023", "diterbitkan_oleh": "Registrasi Obat", "produk": "Obat", "bentuk_sediaan": "SUSPENSI; 1075.500 MG /666.700 MG /66.600 MG", "komposisi": ["ALUMINIUM HYDROXIDE GEL", "MAGNESIUM HYDROXIDE PASTE", "SIMETHICONE EMULSION 30"], "merk": "-", "masa_berlaku": "25-06-2028" } }


    return (
        <div className="flex flex-col min-h-screen gap-3 p-5 pb-24">
            <h1 className="text-2xl font-bold text-zinc-700">Detail Obat</h1>
            <article>
                <h2 className='text-sm'>Nama Obat</h2>
                <p className='text-xs'>{obat.product_name}</p>
            </article>
            <div>
                <article>
                    <h2 className='text-sm'>Status</h2>
                    <p className='text-xs'>{obat.status}</p>
                </article>
            </div>
            <div>
                <article>
                    <h2 className='text-sm'>Kemasan</h2>
                    <p className='text-xs'>{obat.product_package}</p>
                </article>
            </div>
            <div>
                <article>
                    <h2 className='text-sm'>Bentuk Sediaan</h2>
                    <p className='text-xs'>{obat.details.bentuk_sediaan}</p>
                </article>
            </div>
            <div>
                <article>
                    <h2 className='text-sm'>Pendaftar</h2>
                    <p className='text-xs'>{obat.pendaftar}</p>
                </article>
            </div>
            <Accordion>
                <Accordion.Item value="Detail Obat">
                    <Accordion.Control>Komposisi</Accordion.Control>
                    <Accordion.Panel>
                        <article>
                            <ul className='flex flex-wrap items-center'>
                                {obat.details.komposisi.map((komposisi, index) => (
                                    <li key={index} className='text-xs'>{komposisi}</li>
                                ))}
                            </ul>
                            {/* <p className='text-xs'>{obat.details.komposisi}</p> */}
                        </article>
                    </Accordion.Panel>
                </Accordion.Item>

            </Accordion>
        </div>
    )
}

export default MedicineByIdPage