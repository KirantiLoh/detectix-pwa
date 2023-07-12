import React from 'react'

const AboutPage = () => {
    return (
        <main className="flex flex-col min-h-screen gap-3 p-5 pb-24">
            <h1 className="text-2xl font-bold text-zinc-700">Tentang</h1>
            <ul className="grid grid-cols-2 gap-2">
                <li>
                    <article>
                        <h2 className='text-sm'>Juan Dharmananda Khusuma</h2>
                        <p className='text-xs'>Backend Developer</p>
                    </article>
                </li>
                <li>
                    <article>
                        <h2 className='text-sm'>Maurice Yang</h2>
                        <p className='text-xs'>Frontend Developer</p>
                    </article>
                </li>
                <li>
                    <article>
                        <h2 className='text-sm'>Ketut Ivan Sridana</h2>
                        <p className='text-xs'>Project Manager</p>
                    </article>
                </li>
                <li>
                    <article>
                        <h2 className='text-sm'>Viorella Angelica</h2>
                        <p className='text-xs'>Logo Designer</p>
                    </article>
                </li>
            </ul>
        </main>
    )
}

export default AboutPage