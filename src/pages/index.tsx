import SearchBar from "@/components/Home/SearchBar";
import { useAuth } from "@/context/AuthContext";
import withSession from "@/hoc/withSession"
import { Badge } from "@mantine/core";
import { useEffect, useState } from "react";

export default withSession(function Home() {

  const { user } = useAuth();

  const [reminders, setReminders] = useState<{ name: string; time: string; isDone: boolean }[]>([]);

  useEffect(() => {
    localStorage.getItem("reminders") && setReminders(JSON.parse(localStorage.getItem("reminders") as string).filter((val: { name: string; time: string; isDone: boolean }) => val.isDone === true))
  }, [])

  return (
    <main className="flex flex-col min-h-screen gap-5 p-5 pb-24">
      <section>
        <h1 className="text-xl text-zinc-700">Halo, {user?.displayName}</h1>
        <h1 className="text-2xl font-semibold">Jagalah kesehatan</h1>
      </section>
      <SearchBar />
      <section className="">
        <h2 className="text-lg">Berita terkini</h2>
        <article className="min-h-[100px] rounded shadow mt-2"></article>
      </section>
      <section className="">
        <h2 className="text-lg">Konsumsi obat terbaru</h2>
        <ul className="flex flex-col gap-3 mt-2">
          {reminders.length > 0 ?
            reminders.map((val, index) => (
              <li key={index} className="flex gap-4 p-2 border-2 rounded-md border-zinc-300">
                <div className="flex flex-col items-center justify-center px-3 py-0.5 bg-green-100 border-2 border-green-300 rounded">
                  <p className="text-xl">{new Date().getDate()}</p>
                  <p className="text-xs">{val.time}</p>
                </div>
                <div className="flex flex-col">
                  <Badge size="xs" color="green" variant="outline" className="mb-1 w-max">
                    <p className="text-xs">{new Date().toLocaleTimeString("id-ID").slice(0, 5)}</p>
                  </Badge>
                  <p className="max-w-[20ch] text-ellipsis overflow-hidden whitespace-nowrap text-sm">{val.name}</p>
                </div>
              </li>
            ))
            :
            <p className="text-sm text-center text-zinc-500">Tidak ada obat yang harus dikonsumsi</p>
          }
        </ul>
      </section>
    </main>
  )
})
