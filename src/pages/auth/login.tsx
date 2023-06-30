import { Button, TextInput, PasswordInput } from '@mantine/core'
import { HiLockClosed, HiMail } from 'react-icons/hi'
import { useForm, zodResolver } from '@mantine/form'
import { z } from 'zod'
import { SyntheticEvent, useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebaseConfig'
import Link from 'next/link'
import { notifications } from '@mantine/notifications'
import { FaTimes } from 'react-icons/fa'
import withPublic from '@/hoc/withPublic'

export default withPublic(function LoginPage() {
    const [loading, setLoading] = useState(false)

    // const router = useRouter();

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            notifications.show({
                title: "Success",
                message: "Login successfull",
                color: "teal",
                autoClose: 3000,
            })
        }
        catch (err) {
            notifications.show({
                title: "Error",
                message: "Login failed, please try again",
                color: "red",
                autoClose: 3000,
                icon: <FaTimes />
            })
        }
        finally {
            setLoading(false);
        }
    }

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: zodResolver(
            z.object({
                email: z.string().min(1),
                password: z.string().min(6),
            })
        ),
    })

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        form.validate();
        if (!form.isValid()) return;
        setLoading(true);
        login(form.values.email, form.values.password).finally(() =>
            setLoading(false)
        )
    }

    return (
        <main className="relative z-0 flex items-center w-full h-screen overflow-hidden">
            <section className="z-[1] flex flex-col gap-5 px-5 sm:px-10 md:pl-20 w-full sm:w-1/2 sm:min-w-[500px]">
                <aside>
                    <h1 className="text-3xl font-semibold sm:text-5xl">Welcome back</h1>
                    <p className="mt-3 text-xl opacity-80">Sign in to continue</p>
                </aside>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <TextInput
                        radius="md"
                        size="md"
                        label="Email"
                        classNames={{ input: 'mt-0.5' }}
                        placeholder="Email"
                        type='email'
                        icon={<HiMail />}
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        radius="md"
                        size="md"
                        label="Password"
                        classNames={{ input: 'mt-0.5' }}
                        placeholder="Password"
                        icon={<HiLockClosed />}
                        {...form.getInputProps('password')}
                    />
                    <Button
                        loading={loading}
                        radius="md"
                        size="md"
                        className="mt-3 bg-green-600"
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
                <p className="mt-3 text-base opacity-80">
                    Getting started? Register{' '}
                    <Link href="/auth/register" className="underline underline-offset-4">
                        here
                    </Link>
                </p>
            </section>
        </main>
    )
})
