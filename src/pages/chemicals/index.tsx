import { TextInput } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useState } from 'react'
import { HiSearch } from 'react-icons/hi'

const ChemicalsPage = () => {

    const [search, setSearch] = useState('')

    const { data, isLoading } = useQuery({
        queryKey: ["chemicals", search],
        queryFn: async () => {
            if (!search) return;
            const res = await fetch(`/api/chemicals/search/${search}`)
            return await res.json()
        },
        retry: 0,
    })

    return (
        <main className="flex flex-col min-h-screen gap-5 p-5 pb-24 ">
            <section className="p-5 pb-10 -mx-5 -mt-5 bg-green-800 rounded-b-lg shadow-md bg-opacity-90">
                <div className="flex items-center gap-1 font-bold text-white overflow-ellipsis font-montserrat">
                    <h1 className="text-lg font-normal">Cari Bahan Kimia     </h1>
                    {/* <h1 className="text-lg">{user?.displayName}</h1> */}
                </div>
                <h1 className="mb-5 text-2xl font-semibold text-white">Daftar Alergen</h1>
                <TextInput placeholder="Cari bahan kimia"
                    radius="xl"
                    // icon={<HiSearch />}
                    value={search}
                    onChange={(e) => setSearch(e.currentTarget.value)}
                    rightSection={<HiSearch className='' />}
                    variant='filled'
                    classNames={{
                        input: "bg-white shadow"
                    }}
                />
            </section>
            <section>
                <h1 className="mb-3 text-[#333] text-xl font-medium">Hasil Pencarian</h1>
                {isLoading ? <h3>Loading...</h3> :
                    (data ?
                        <ul className="grid grid-cols-2 gap-3">
                            {data.map((item: any) => {
                                console.log(item)
                                return (
                                    <li key={item.id} className='flex flex-col'>
                                        <article className="rounded-xl text-center text-xs text-white font-bold bg-[#EB5353] w-full aspect-square shadow-md flex-1 relative">
                                            <div className="relative w-full bg-white aspect-square rounded-t-xl">
                                                <Image src={`https://go.drugbank.com/structures/${item.ingredients.find((val: any) => val.drug.drugbank_id).drug.drugbank_id}/image.svg`} alt="" fill />
                                            </div>
                                            <div className="p-3">
                                                <p className="text-xs font-medium">{item.name}</p>
                                            </div>
                                        </article>
                                        {/* <h1 className="text-sm text-gray-500">{item.description}</h1> */}
                                    </li>
                                )
                            })}
                        </ul>
                        : <p>Tak ada</p>
                    )}
            </section>
        </main>
    )
}

export default ChemicalsPage