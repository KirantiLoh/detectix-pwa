import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import React, { ComponentType, useEffect } from 'react'

const withPublic = <T extends object>(Component: ComponentType<T>) => {
    return function WithPublic(props: T) {

        const { user, loading } = useAuth();

        const router = useRouter();

        useEffect(() => {
            if (user && !loading) {
                router.replace('/');
            }
        }, [user])


        return !user ? <Component {...props} /> : <></>

    }
}

export default withPublic