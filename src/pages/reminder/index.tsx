import withSession from '@/hoc/withSession'
import { DatePicker, TimeInput } from '@mantine/dates'
import { SyntheticEvent, useEffect, useState } from 'react'
import 'dayjs/locale/id';
import { HiPlus } from 'react-icons/hi';
import { Modal, TextInput, Button, Menu, Badge } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { BiCheck, BiDotsVerticalRounded, BiTrashAlt } from 'react-icons/bi';
import { z } from 'zod';

const ReminderPage = () => {

    const [date, setDate] = useState(new Date());
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reminders, setReminders] = useState([
        {
            name: 'Bodrex',
            time: '08:00',
            isDone: false,
        }
    ]);

    const handleChange = (val: Date) => {
        setDate(val)
    };

    const form = useForm({
        initialValues: {
            name: '',
            time: '',
        },
        validate: zodResolver(
            z.object({
                name: z.string().min(1),
                time: z.string().min(1),
            })
        ),
    })

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        form.validate();
        if (!form.isValid()) return;
        setLoading(true);
        setReminders([...reminders, { ...form.values, isDone: false }]);
        localStorage.setItem("reminders", JSON.stringify([...reminders, form.values]));
        setLoading(false);
        setOpenModal(false);
        form.reset();
    }

    useEffect(() => {
        localStorage.getItem("reminders") && setReminders(JSON.parse(localStorage.getItem("reminders") as string))
    }, [])

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
                    {reminders.map((val, index) => (
                        <li key={index}>
                            <div className="flex items-center justify-between p-3 border-b-2 border-b-zinc-300">
                                <div className="">
                                    <p className='max-w-[20ch]'>{val.name}</p>
                                    <Badge variant='filled' color={val.isDone ? 'green' : 'red'}>{val.isDone ? 'Selesai' : 'Belum'}</Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                    <p>{val.time}</p>
                                    <Menu >
                                        <Menu.Target>
                                            <button>
                                                <BiDotsVerticalRounded className='text-xl text-zinc-700' />
                                            </button>
                                        </Menu.Target>
                                        <Menu.Dropdown>
                                            <Menu.Item onClick={() => {
                                                setReminders(reminders.map((reminder, i) => i === index ? { ...reminder, isDone: !reminder.isDone } : reminder))
                                                localStorage.setItem("reminders", JSON.stringify(reminders.map((reminder, i) => i === index ? { ...reminder, isDone: !reminder.isDone } : reminder)))
                                            }} className='' icon={<BiCheck />}>
                                                Selesai
                                            </Menu.Item>
                                            <Menu.Item onClick={() => {
                                                setReminders(reminders.filter((_, i) => i !== index))
                                                localStorage.setItem("reminders", JSON.stringify(reminders.filter((_, i) => i !== index)))
                                            }} className='text-red-500' icon={<BiTrashAlt />}>
                                                Hapus
                                            </Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                </div>
                            </div>
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
                        {...form.getInputProps('name')}
                    />
                    <TimeInput
                        label='Waktu Konsumsi'
                        {...form.getInputProps('time')}
                    />
                    <Button type='submit' className='bg-green-600' loading={loading}>
                        Tambahkan
                    </Button>
                </form>
            </Modal>
        </main>
    )
}

export default withSession(ReminderPage)