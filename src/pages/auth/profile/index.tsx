import { useAuth } from '@/context/AuthContext'
import withSession from '@/hoc/withSession'
import { auth } from '@/lib/firebaseConfig'
import { Button } from '@mantine/core'
import Image from 'next/image'
import React from 'react'
import { useSignOut } from 'react-firebase-hooks/auth'

const ProfilePage = () => {

    const { user } = useAuth();

    const [logout] = useSignOut(auth);

    return (
        <main className="flex flex-col items-center w-full min-h-screen gap-5 p-5">
            <h1 className='text-2xl font-bold text-zinc-700'>Akun</h1>
            <Image src={user?.photoURL ?? "/default-user.png"} alt="" width={150} height={150} className='mx-auto' />
            <section className='text-center'>
                <h1 className="text-2xl text-zinc-700">Halo, {user?.displayName}</h1>
                <h2 className="">{user?.email}</h2>
            </section>
            <Button color='red' className='w-full bg-red-600' radius="md" onClick={() => logout()}>Keluar</Button>
        </main>
    )
}

export default withSession(ProfilePage)