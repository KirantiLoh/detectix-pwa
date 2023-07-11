import { ReactNode, createContext } from 'react'
import axios from 'axios';
import { env } from '@/env.mjs';
const AxiosContext = createContext({

});

export const AxiosProvider = ({ children }: { children: ReactNode }) => {


    // axios.defaults.baseURL = env.NEXT_PUBLIC_BACKEND_URL;

    const contextValue = {

    }

    return (
        <AxiosContext.Provider value={contextValue}>
            {children}
        </AxiosContext.Provider>
    )
}
