import { useOCR } from '@/context/OCRContext';
import withSession from '@/hoc/withSession';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useRef, useState } from 'react'

const ScanPage = () => {

    const { scanImage } = useOCR();

    const inputRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    useEffect(() => {
        inputRef.current?.click();
    }, [])

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log(file);
        if (!file) {
            router.replace('/');
            return;
        }
        const imageUrl = URL.createObjectURL(file);
        scanImage(imageUrl);
        router.replace('/scan/result');
    }

    return (
        <div>
            <input ref={inputRef} type="file" accept="image/*" capture="environment" className='hidden' onChange={handleFileChange} onBlur={handleFileChange} />
        </div>
    )
}

export default withSession(ScanPage)