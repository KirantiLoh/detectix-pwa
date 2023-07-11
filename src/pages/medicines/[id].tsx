import { env } from '@/env.mjs';
import { MedicineType } from '@/typings/app';
import { Accordion } from '@mantine/core'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import React from 'react'

const MedicineByIdPage = ({ data: obat }: { data: MedicineType }) => {


    return (
        <div className="flex flex-col min-h-screen gap-3 p-5 pb-24">
            <h1 className="text-2xl font-bold text-zinc-700">Detail Obat</h1>
            <article>
                <h2 className='text-sm'>Nama Obat</h2>
                <p className='text-xs'>{obat.PRODUCT_NAME}</p>
            </article>
            <div>
                <article>
                    <h2 className='text-sm'>Status</h2>
                    <p className='text-xs'>{obat.STATUS}</p>
                </article>
            </div>
            <div>
                <article>
                    <h2 className='text-sm'>Kemasan</h2>
                    <p className='text-xs'>{obat.PRODUCT_PACKAGE}</p>
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
                    <p className='text-xs'>{obat.PENDAFTAR}</p>
                </article>
            </div>
            <Accordion>
                <Accordion.Item value="Detail Obat">
                    <Accordion.Control>Komposisi</Accordion.Control>
                    <Accordion.Panel>
                        <article>
                            <ul className='flex flex-wrap items-center'>
                                {obat.details.komposisi ?
                                    obat.details.komposisi.map((komposisi, index) => (
                                        <li key={index} className='text-xs'>{komposisi}</li>
                                    ))
                                    :
                                    <p>-</p>}
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

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
    const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/bpom/products/${query.id}`);
    const data = await res.json();
    console.log(data)
    if (res.status !== 200) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            data
        }
    } satisfies GetServerSidePropsResult<{ data: MedicineType }>

}