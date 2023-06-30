"use client";

import { TextInput, PasswordInput, Button } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import { FaAddressCard, FaTimes, FaUser } from "react-icons/fa";
import { HiLockClosed, HiMail } from "react-icons/hi";
import { z } from "zod";
import { notifications } from '@mantine/notifications';
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import withPublic from "@/hoc/withPublic";

export default withPublic(function RegisterPage() {
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const register = async ({ fullName, password, email }: { fullName: string, password: string, email: string }) => {
        try {

            const userCreds = await createUserWithEmailAndPassword(auth, email, password);
            updateProfile(userCreds.user, { displayName: fullName });
            notifications.show({
                title: "Success",
                message: "Account created successfully",
                color: "teal",
                autoClose: 3000,
            })
        }
        catch (err) {
            notifications.show({
                title: "Error",
                message: "Account creation failed, please try again",
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
            fullName: "",
            password: "",
            firstName: "",
            lastName: "",
            email: "",
        },
        validate: zodResolver(z.object({
            fullName: z.string().min(1),
            password: z.string().min(6),
            // firstName: z.string().min(2),
            // lastName: z.string().min(2),
            email: z.string().email(),
        })),
    })

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        form.validate();
        if (!form.isValid()) return;
        setLoading(true);
        void register({ ...form.values });
    }

    return (
        <main className="relative z-0 flex items-center w-full h-screen overflow-hidden">
            <section className=" pb-5 sm:pt-0 z-[1] flex flex-col gap-3 sm:gap-6 px-5 sm:px-10 md:pl-20 w-full sm:w-1/2 sm:min-w-[500px]">
                <aside>
                    <h1 className="text-3xl font-semibold sm:text-5xl">Create New Account</h1>
                    {/* <p className="mt-1 text-sm sm:text-lg sm:mt-3 opacity-80">Start creating your masterpieces</p> */}
                </aside>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    {/* <div className="flex flex-col w-full gap-2 sm:gap-4 sm:items-center sm:flex-row">
                        <TextInput {...form.getInputProps("firstName")} placeholder="First Name" className="flex-1" size="md" label="First Name" icon={<FaAddressCard />} />
                        <TextInput {...form.getInputProps("lastName")} placeholder="Last Name" className="flex-1" size="md" label="Last Name" icon={<FaAddressCard />} />
                    </div> */}
                    <TextInput {...form.getInputProps("fullName")} placeholder="Nama Lengkap" className="flex-1" size="md" label="Nama Lengkap" icon={<FaUser />} />
                    <TextInput {...form.getInputProps("email")} placeholder="Email" size="md" label="Email" type="email" icon={<HiMail />} />
                    <PasswordInput {...form.getInputProps("password")} placeholder="Password" size="md" label="Password" icon={<HiLockClosed />} />
                    <Button loading={loading} radius="md" size="md" className="mt-3 bg-green-600" type="submit">
                        Register
                    </Button>
                </form>
                <p className="mt-3 text-base opacity-80">Have an account? Login <Link href="/auth/login" className="underline underline-offset-4">here</Link></p>
            </section>
        </main>
    )
})
