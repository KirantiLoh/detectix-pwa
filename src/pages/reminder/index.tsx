import withSession from '@/hoc/withSession'
import { DatePicker } from '@mantine/dates'
import { useState } from 'react'
import 'dayjs/locale/id';
import { HiPlus } from 'react-icons/hi';

const ReminderPage = () => {

    const [date, setDate] = useState(new Date());

    const handleChange = (val: Date) => {
        setDate(val)
    };

    return (
        <main className='min-h-screen p-5 pb-20'>
            <section className='flex flex-col items-center justify-start'>
                <DatePicker
                    className='p-3 shadow-md rounded-xl'
                    date={date}
                    onDateChange={setDate}
                    value={date}
                    onChange={handleChange}
                    locale='id'
                />
            </section>
            <section className="pt-3 mt-5">
                <div className="flex items-center justify-between">
                    <h2 className='text-sm'>{Intl.DateTimeFormat("id", { dateStyle: "long" }).format(date)}</h2>
                    <button>
                        <HiPlus className='text-xl text-zinc-700' />
                    </button>
                </div>
                <ul>
                    {[...Array(10)].map((_, index) => (
                        <li key={index}>
                            <div className="flex items-center justify-between p-2 border-b-2 border-b-zinc-300">
                                <p className='max-w-[20ch]'>Test</p>
                                <p></p>
                            </div>
                        </li>
                    ))
                    }
                </ul>
            </section>
        </main>
    )
}

export default withSession(ReminderPage)