import SearchBar from "@/components/Home/SearchBar";
import { useAuth } from "@/context/AuthContext";
import withSession from "@/hoc/withSession"
import { Badge } from "@mantine/core";


export default withSession(function Home() {

  const { user } = useAuth();

  return (
    <main className="flex flex-col min-h-screen gap-5 p-5 pb-20">
      <section>
        <h1 className="text-xl text-zinc-700">Halo, {user?.displayName}</h1>
        <h1 className="text-3xl font-semibold">Jagalah kesehatan</h1>
      </section>
      <SearchBar />
      <section className="">
        <h2 className="text-lg">Berita terkini</h2>
        <article className="min-h-[100px] rounded shadow mt-2"></article>
      </section>
      <section className="">
        <h2 className="text-lg">Konsumsi obat terbaru</h2>
        <ul className="flex flex-col gap-3 mt-2">
          {[...Array(10)].map((_, index) => (
            <li key={index} className="flex gap-4 p-2 border-2 rounded-md border-zinc-300">
              <div className="flex flex-col items-center justify-center px-3 py-0.5 bg-green-100 border-2 border-green-300 rounded">
                <p className="text-xl">{new Date().getDate()}</p>
                <p className="text-xs">{Intl.DateTimeFormat("id", { dateStyle: "long" }).format(new Date()).split(" ")[1]}</p>
              </div>
              <div className="flex flex-col">
                <Badge size="xs" color="green" variant="outline" className="w-max">
                  <p className="text-xs">{new Date().toLocaleTimeString("id-ID").slice(0, 5)}</p>
                </Badge>
                <p className="max-w-[20ch] text-ellipsis overflow-hidden whitespace-nowrap">Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci sapiente consequuntur dicta! Eveniet totam excepturi illum aperiam laborum? Odio hic deserunt maxime nam iure molestiae inventore nemo error, asperiores quis?</p>
              </div>
            </li>
          ))
          }
        </ul>
      </section>
    </main>
  )
})
