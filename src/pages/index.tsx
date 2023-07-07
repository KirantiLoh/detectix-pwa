import SearchBar from "@/components/Home/SearchBar";
import { useAuth } from "@/context/AuthContext";
import withSession from "@/hoc/withSession"
import { Badge } from "@mantine/core";
import { Carousel } from "@mantine/carousel"
import { Montserrat, Poppins } from "next/font/google"
import { BiSearchAlt } from "react-icons/bi";
import { BsQrCodeScan } from "react-icons/bs"
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiCalendar, HiInformationCircle, HiOutlineLocationMarker } from "react-icons/hi";
import { GiCalendar, GiMicroscope, GiNotebook } from "react-icons/gi";
import Link from "next/link";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { ScheduleType } from "@/typings/app";
import { db } from "@/lib/firebaseConfig";

const montserrat = Montserrat({ subsets: ["latin", "latin-ext"] });
const poppins = Poppins({ weight: ["600", "700"], subsets: ["latin", "latin-ext"] })

const HomePage = () => {
  const { user } = useAuth();

  const [reminders, setReminders] = useState<ScheduleType[]>([]);

  useEffect(() => {
    if (!user) return;
    getDocs(query(collection(db, "users", user.uid, "schedules"), where("isDone", "==", true), limit(5), orderBy("time", "desc"))).then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      console.log(data)
      setReminders(data as ScheduleType[]);
    })
  }, [])

  return (
    <main className="flex flex-col min-h-screen gap-5 p-5 pb-24 ">
      <section className="p-5 pb-10 -mx-5 -mt-5 bg-green-800 rounded-b-lg shadow-md bg-opacity-90">
        <aside style={montserrat.style} className="flex items-center gap-1 font-bold text-white overflow-ellipsis font-montserrat">
          <h1 className="text-lg font-normal">Halo, </h1>
          <h1 className="text-lg">{user?.displayName}</h1>
        </aside>
        <h1 style={montserrat.style} className="mb-5 text-2xl font-semibold text-white">Jagalah Kesehatan</h1>
        <SearchBar />
      </section>
      <section className="">
        <h1 style={poppins.style} className="mb-2 text-xl text-[#333]">Quick Actions</h1>
        <ul className="flex items-stretch w-full gap-2">
          <li className="flex-1">
            <Link href="/pharmas" className="flex items-center justify-center w-full text-green-600 bg-white rounded-md shadow aspect-square">
              <HiOutlineLocationMarker className="text-2xl" />
            </Link>
          </li>
          <li className="flex-1">
            <Link href="/reminder" className="flex items-center justify-center w-full text-green-600 bg-white rounded-md shadow aspect-square">
              <GiCalendar className="text-2xl" />
            </Link>
          </li>
          <li className="flex-1">
            <Link href="/" className="flex items-center justify-center w-full text-green-600 bg-white rounded-md shadow aspect-square">
              <GiMicroscope className="text-2xl" />
            </Link>
          </li>
          <li className="flex-1">
            <Link href="/" className="flex items-center justify-center w-full text-green-600 bg-white rounded-md shadow aspect-square">
              <GiNotebook className="text-2xl" />
            </Link>
          </li>
          <li className="flex-1">
            <Link href="/about" className="flex items-center justify-center w-full text-green-600 bg-white rounded-md shadow aspect-square">
              <HiInformationCircle className="text-2xl" />
            </Link>
          </li>
        </ul>
      </section>
      <section className="">
        <h1 style={poppins.style} className="mb-4 text-[#333] text-xl">Alergen Anda</h1>
        <Carousel
          height={170}
          withControls={false}
          slideSize={"25%"}
          slideGap="md"
          align="start"
          dragFree
        >
          <Carousel.Slide className="">
            <article style={montserrat.style} className="rounded-xl text-center text-xs text-white font-bold bg-[#EB5353] w-40 aspect-square shadow-md">
              <Image alt="aspirin" src="/aspirin.jpg" width={500} height={500} className="rounded-t-xl" />
              <p className="p-3">Aspirin</p>
            </article>
          </Carousel.Slide>
          <Carousel.Slide className="">
            <article style={montserrat.style} className="rounded-xl text-center text-xs text-white font-bold bg-[#EB5353] w-40 aspect-square shadow-md">
              <Image alt="aspirin" src="/aspirin.jpg" width={160} height={160} className="rounded-t-xl" />
              <p className="p-3">Aldesulfone</p>
            </article>
          </Carousel.Slide>
          <Carousel.Slide className="">
            <article style={montserrat.style} className="rounded-xl text-center text-xs text-white font-bold bg-[#EB5353] w-40 aspect-square shadow-md">
              <Image alt="aspirin" src="/aspirin.jpg" width={160} height={160} className="rounded-t-xl" />
              <p className="p-3">Penicilin</p>
            </article>
          </Carousel.Slide>
          <Carousel.Slide className="">
            <article style={montserrat.style} className="rounded-xl text-center text-xs text-white font-bold bg-[#EB5353] w-40 aspect-square shadow-md">
              <Image alt="aspirin" src="/aspirin.jpg" width={160} height={160} className="rounded-t-xl" />
              <p className="p-3">Acetaminophen</p>
            </article>
          </Carousel.Slide>
        </Carousel>
      </section>
      <section style={montserrat.style}>
        <h1 className="text-xl text-[#333] font-bold">Konsumsi Obat Terakhir</h1>
        <ul className="flex flex-col gap-3 mt-2">
          {reminders.length > 0 ?
            reminders.map((val, index) => (
              <li key={index} className="flex gap-4 p-2 border-2 rounded-md border-zinc-300">
                <article className="flex flex-col items-center justify-center px-3 py-0.5 bg-green-100 border-2 border-green-300 rounded">
                  <p className="text-xl">{new Date().getDate()}</p>
                  <p className="text-xs">{Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(new Date()).split(" ")[1]}</p>
                </article>
                <article className="flex flex-col">
                  <Badge size="xs" color="green" variant="outline" className="mb-1 w-max">
                    <p className="text-xs">{val.time.toDate().toLocaleTimeString("id-ID").slice(0, 5)}</p>
                  </Badge>
                  <p className="max-w-[20ch] text-ellipsis overflow-hidden whitespace-nowrap text-sm">{val.title}</p>
                </article>
              </li>
            ))
            :
            <p className="text-sm text-zinc-500">Tidak ada konsumsi yang tercatat</p>
          }
        </ul>

      </section>
    </main>
  )
}

export default withSession(HomePage)
