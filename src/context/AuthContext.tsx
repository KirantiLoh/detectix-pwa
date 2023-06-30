import BottomTab from '@/components/base/BottomTab';
import { auth } from '@/lib/firebaseConfig';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';

const AuthContext = createContext({
    user: null as User | null | undefined,
    loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, loading] = useAuthState(auth);

    const contextValue = {
        user,
        loading
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {!loading ? children : null}
            {user ? <BottomTab /> : null}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);