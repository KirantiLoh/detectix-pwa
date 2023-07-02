import { TextInput } from '@mantine/core'
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react'
import { AiOutlineEnter } from 'react-icons/ai';
import { HiSearch } from 'react-icons/hi';

const SearchBar = () => {

    const [search, setSearch] = useState('');

    const router = useRouter();

    const handleSearch = () => {
        console.log("Searching");
        if (!search) return;
        router.push(`/search?q=${search}`);
    }

    return (
        <form onSubmit={e => {
            e.preventDefault();
            handleSearch();
        }}>
            <TextInput
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
                placeholder='ID BPOM, bahan aktif, atau nama produk'
                radius="xl"
                // icon={<HiSearch />}
                rightSection={<HiSearch className='' onClick={handleSearch} />}
                variant='filled'
                classNames={{
                    input: "bg-white shadow"
                }}
            />
        </form>
    )
}

export default SearchBar