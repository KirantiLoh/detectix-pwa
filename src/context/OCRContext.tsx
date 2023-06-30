import { useRouter } from 'next/router';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { createWorker, Worker } from 'tesseract.js';

const OCRContext = createContext({
    worker: null as Worker | null,
    result: "",
    imageUrl: "",
    clearImage: () => { },
    scanImage: async (url: string) => { }
});

export const OCRProvider = ({ children }: { children: ReactNode }) => {

    const [imageUrl, setImageUrl] = useState<string>('');
    const [worker, setWorker] = useState<Worker | null>(null);
    const [result, setResult] = useState<string>('');

    const router = useRouter();

    const scanImage = async (url: string) => {
        router.push('/scan/result');
        setResult("");
        setImageUrl(url);
        const { data: { text } } = await worker!.recognize(url);
        setResult(text);
    }

    const clearImage = () => {
        setImageUrl("");
        setResult("");
    }

    const initializeOCR = async () => {
        const newWorker = await createWorker({
            logger: m => console.log(m)
        });
        await newWorker.loadLanguage('eng+ind');
        await newWorker.initialize('eng+ind');
        setWorker(newWorker);
    }

    useEffect(() => {
        initializeOCR();
        return () => {
            worker?.terminate();
        }
    }, [])

    const contextValue = {
        worker,
        result,
        imageUrl,
        scanImage,
        clearImage,
    }

    return (
        <OCRContext.Provider value={contextValue}>
            {children}
        </OCRContext.Provider>
    )
}

export const useOCR = () => useContext(OCRContext);