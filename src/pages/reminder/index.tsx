import withSession from '@/hoc/withSession'
import { DatePicker, TimeInput } from '@mantine/dates'
import { SyntheticEvent, useEffect, useState } from 'react'
import 'dayjs/locale/id';
import { HiPlus } from 'react-icons/hi';
import { Modal, TextInput, Button, Menu, Badge, Textarea, HoverCard } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { BiCheck, BiDotsVerticalRounded, BiTrashAlt } from 'react-icons/bi';
import { z } from 'zod';
import { ReminderValidator } from '@/validators';
import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import { useAuth } from '@/context/AuthContext';
import { notifications } from '@mantine/notifications';
import { ScheduleType } from '@/typings/app';

const ReminderPage = () => {

    const { user } = useAuth();

    const [date, setDate] = useState(new Date());
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reminders, setReminders] = useState<ScheduleType[]>([]);

    const handleChange = (val: Date) => {
        setDate(val)
    };

    console.log(user)

    const form = useForm({
        initialValues: {
            title: '',
            description: '',
            time: '',
        },
        validate: zodResolver(ReminderValidator),
        transformValues(values) {
            return {
                ...values,
                time: Timestamp.fromMillis(date.setHours(parseInt(values.time.split(":")[0]), parseInt(values.time.split(":")[1]))),
            }
        },
    })

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            form.validate();
            if (!form.isValid()) return;
            const data = { ...form.getTransformedValues(), isDone: false }
            // localStorage.setItem("reminders", JSON.stringify([...reminders, form.values]));
            ReminderValidator.safeParse(data);
            const docRef = await addDoc(collection(db, "users", user!.uid, "schedules"), data);
            setReminders([...reminders, { ...data, id: docRef.id }]);
            setOpenModal(false);
            notifications.show({ title: "Sukses", message: 'Berhasil menambahkan jadwal', color: 'green' });
            form.reset();
        }
        catch (error) {
            console.error(error);
            notifications.show({ title: "Gagal", message: 'Gagal menambahkan jadwal', color: 'green' });
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // localStorage.getItem("reminders") && setReminders(JSON.parse(localStorage.getItem("reminders") as string))
        if (!user) return;
        // console.log(user.uid)
        const curDate = new Date(date);
        getDocs(query(collection(db, "users", user.uid, "schedules"), where("time", ">", Timestamp.fromMillis(curDate.setHours(0, 0, 0, 0))), where("time", "<=", Timestamp.fromMillis(curDate.setHours(24, 0, 0, 0))), orderBy("time", "asc"))).then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            console.log(data)
            setReminders(data as ScheduleType[]);
        })
    }, [date])

    return (
        <main className='min-h-screen p-3 pb-24'>
            <section className='flex flex-col items-center justify-start'>
                <h1 className='px-2 mb-3 text-2xl font-bold'>Jadwal Konsumsi</h1>
                <DatePicker
                    className='p-3 bg-white shadow-lg rounded-xl'
                    date={date}
                    onDateChange={setDate}
                    value={date}
                    onChange={handleChange}
                    locale='id'
                />
            </section>
            <section className="px-2 pt-3 mt-3">
                <div className="flex items-center justify-between mb-2">
                    <h2 className='text-base font-medium'>{Intl.DateTimeFormat("id", { dateStyle: "long" }).format(date)}</h2>
                    <button onClick={() => setOpenModal(true)}>
                        <HiPlus className='text-xl text-zinc-700' />
                    </button>
                </div>
                <ul>
                    {!reminders.length ?
                        <p className='text-sm text-gray-700'>Tak ada jadwal konsumsi obat</p>
                        :
                        reminders.map((val, index) => (
                            <li key={index}>
                                <HoverCard width={280} shadow="md">
                                    <div className="flex items-center justify-between p-3 border-b-2 border-b-zinc-300">
                                        <HoverCard.Target>
                                            <div className="">
                                                <p className='max-w-[20ch]'>{val.title}</p>
                                                <Badge variant='filled' color={val.isDone ? 'green' : 'red'}>{val.isDone ? 'Selesai' : 'Belum'}</Badge>
                                            </div>
                                        </HoverCard.Target>
                                        <div className="flex items-center gap-2">
                                            <p>{val.time.toDate().toLocaleTimeString("id-ID").slice(0, 5)}</p>
                                            <Menu >
                                                <Menu.Target>
                                                    <button>
                                                        <BiDotsVerticalRounded className='text-xl text-zinc-700' />
                                                    </button>
                                                </Menu.Target>
                                                <Menu.Dropdown>
                                                    <Menu.Item onClick={() => {
                                                        setReminders(reminders.map((reminder, i) => i === index ? { ...reminder, isDone: !reminder.isDone } : reminder))
                                                        void updateDoc(doc(db, "users", user!.uid, "schedules", val.id), { isDone: !val.isDone })
                                                        // localStorage.setItem("reminders", JSON.stringify(reminders.map((reminder, i) => i === index ? { ...reminder, isDone: !reminder.isDone } : reminder)))
                                                    }} className='' icon={<BiCheck />}>
                                                        Selesai
                                                    </Menu.Item>
                                                    <Menu.Item onClick={() => {
                                                        setReminders(reminders.filter((_, i) => i !== index))
                                                        // localStorage.setItem("reminders", JSON.stringify(reminders.filter((_, i) => i !== index)))
                                                        void deleteDoc(doc(db, "users", user!.uid, "schedules", val.id))
                                                    }} className='text-red-500' icon={<BiTrashAlt />}>
                                                        Hapus
                                                    </Menu.Item>
                                                </Menu.Dropdown>
                                            </Menu>
                                        </div>
                                    </div>
                                    <HoverCard.Dropdown>
                                        <div className="p-3">
                                            <p className='text-sm text-gray-700'>{val.description}</p>
                                        </div>
                                    </HoverCard.Dropdown>
                                </HoverCard>
                            </li>
                        ))
                    }
                </ul>
            </section>
            <Modal
                opened={openModal}
                onClose={() => setOpenModal(false)}
                title='Tambahkan pengingat'
                classNames={{
                    title: "text-lg font-semibold"
                }}
            >
                <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
                    <TextInput
                        label='Nama obat'
                        {...form.getInputProps('title')}
                    />
                    <Textarea
                        label='Deskripsi'
                        {...form.getInputProps('description')}
                    />
                    <TimeInput
                        label='Waktu Konsumsi'
                        {...form.getInputProps('time')}
                    />
                    <Button type='submit' className='mt-3 bg-green-600' loading={loading}>
                        Tambahkan
                    </Button>
                </form>
            </Modal>
        </main>
    )
}

export default withSession(ReminderPage)