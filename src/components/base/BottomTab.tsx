import Link from 'next/link'
import { useRouter } from 'next/router';
import { ReactNode, ChangeEvent, useRef } from 'react'
import { HiOutlineHome, HiOutlineCalendar, HiOutlineLocationMarker, HiOutlineUser } from 'react-icons/hi';
// import { BiScan } from "react-icons/bi"
import { LuScanFace } from "react-icons/lu"

import { useOCR } from '@/context/OCRContext';
import resizeImage from '@/utils/resizeImage';

const NavLink = ({ href, children, className, currentPage }: {
    href: string;
    children: ReactNode;
    className?: string;
    currentPage: string;
}) => {
    return (
        <Link href={href} className={`flex flex-col items-center justify-center gap-2 text-2xl standalone:text-3xl ${currentPage === href ? "text-green-600" : "text-zinc-400"} ${className}`}>
            {children}
        </Link>
    )
}

const BottomTab = () => {

    const router = useRouter();

    const { scanImage } = useOCR();

    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            router.replace('/');
            return;
        }
        const image = await resizeImage(file, 2500);
        if (!image) return;
        const imageUrl = URL.createObjectURL(image);
        inputRef.current!.value = '';
        scanImage(imageUrl);
    }


    return (
        <nav className='fixed bottom-0 z-20 flex items-center w-full max-w-lg -translate-x-1/2 bg-white h-14 standalone:h-16 standalone:pb-3 left-1/2 rounded-t-xl shadow-upper justify-evenly'>
            <NavLink currentPage={router.pathname} href='/'>
                <HiOutlineHome />
            </NavLink>
            <NavLink currentPage={router.pathname} href='/pharmas' className='-mr-4'>
                <HiOutlineLocationMarker />
            </NavLink>
            {/* <NavLink currentPage={router.pathname} href='/scan' className='relative p-4 text-4xl !text-white bg-green-600 rounded-full shadow -top-1/3'>
                <BiScan />
            </NavLink> */}
            <label htmlFor='scan' className='block relative p-4 text-4xl !text-white bg-green-600 rounded-full shadow -top-1/3'>
                <LuScanFace />
            </label>
            <input ref={inputRef} id='scan' type="file" accept="image/*" capture="environment" className='hidden' onChange={handleFileChange} />
            <NavLink currentPage={router.pathname} href='/reminder' className='-ml-4'>
                <HiOutlineCalendar />
            </NavLink>
            <NavLink currentPage={router.pathname} href='/auth/profile'>
                <HiOutlineUser />
            </NavLink>
        </nav >
    )
}

export default BottomTab
