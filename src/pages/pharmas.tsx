import withSession from '@/hoc/withSession';
import getAddress from '@/utils/getAddress';
import { Icon } from 'leaflet';
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'

const Map = dynamic(() => import('@/components/Map'), {
    ssr: false,
    loading: () => <div>Loading...</div>
});

const Markers = dynamic(() => import('@/components/Markers'), {
    ssr: false,
});

const Marker = dynamic(() => import('@/components/Marker'), {
    ssr: false,
});

const PharmaPage = () => {

    const [location, setLocation] = useState({ latitude: 0.7893, longitude: 113.9213 })
    const [center, setCenter] = useState<{ latitude: number, longitude: number } | null>(null)



    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setCenter({ latitude: position.coords.latitude, longitude: position.coords.longitude });
            setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
            console.log(getAddress(position.coords.latitude, position.coords.longitude))
        })
    }, [])

    return (
        <main className='relative flex flex-col w-full h-[calc(100vh-56px)] z-0'>
            <section className="relative flex-1">
                {center ?
                    <Map latitude={center.latitude} longitude={center.longitude}>
                        <Marker latitude={center.latitude} longitude={center.longitude} name="Current Location" />
                        <Markers />
                    </Map>
                    :
                    <></>}
            </section>
        </main>
    )
}

export default withSession(PharmaPage)