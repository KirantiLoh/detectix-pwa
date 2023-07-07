import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebaseConfig'
import { useRouter } from 'next/router';
import React, { ComponentType, useEffect } from 'react'

const withSession = <T extends object>(Component: ComponentType<T>) => {
    return function WithSession(props: T) {

        const { user, loading } = useAuth();

        const router = useRouter();

        useEffect(() => {
            if (!user && !loading) {
                router.replace('/auth/login');
            }
        }, [])


        return user && !loading ? <Component {...props} /> : <main></main>

    }
}

export default withSession