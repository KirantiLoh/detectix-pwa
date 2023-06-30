import { TextInput } from '@mantine/core'
import { useState, useEffect, useRef } from 'react'
import { AiOutlineEnter } from 'react-icons/ai';
import { HiSearch } from 'react-icons/hi';

const SearchBar = () => {

    const [search, setSearch] = useState('');

    const handleSearch = () => {
        console.log("Searching");
        if (!search) return;
    }

    return (
        <form onSubmit={e => {
            e.preventDefault();
            handleSearch();
        }}>
            <TextInput
                // ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
                placeholder='Cari berdasarkan ID BPOM'
                radius="xl"
                icon={<HiSearch />}
                rightSection={<AiOutlineEnter className='' onClick={handleSearch} />}
                variant='filled'
                classNames={{
                    input: "bg-white shadow"
                }}
            />
        </form>
    )
}

export default SearchBar