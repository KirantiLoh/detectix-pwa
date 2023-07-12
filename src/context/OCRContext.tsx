import { useRouter } from 'next/router';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { createWorker, Worker } from 'tesseract.js';

const OCRContext = createContext({
    worker: null as Worker | null,
    result: "",
    imageUrl: "",
    progress: 0,
    clearImage: () => { },
    scanImage: async (url: string) => { }
});

export const OCRProvider = ({ children }: { children: ReactNode }) => {

    const [imageUrl, setImageUrl] = useState<string>('');
    const [worker, setWorker] = useState<Worker | null>(null);
    const [result, setResult] = useState<string>('');
    const [progress, setProgress] = useState<number>(0);

    const router = useRouter();

    const scanImage = async (url: string) => {
        setProgress(0);
        router.push('/scan/result');
        setResult("");
        setImageUrl(url);
        const { data: { text } } = await worker!.recognize(url);
        setResult(text);
    }

    const clearImage = () => {
        setImageUrl("");
        setResult("");
        setProgress(0);
    }

    const initializeOCR = async () => {
        const newWorker = await createWorker({
            logger: m => {
                console.log(m);
                setProgress(m.progress * 100);
            }
        });
        await newWorker.loadLanguage('eng+ind');
        await newWorker.initialize('eng+ind');
        await newWorker.setParameters({
            // tessedit_char_whitelist: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz/' '", // whitelist
        })
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
        progress,
    }

    return (
        <OCRContext.Provider value={contextValue}>
            {children}
        </OCRContext.Provider>
    )
}

export const useOCR = () => useContext(OCRContext);