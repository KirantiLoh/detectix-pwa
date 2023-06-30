import { useMap } from "react-leaflet";
import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useState } from "react";

const Markers = () => {
    const map = useMap();

    const [location, setLocation] = useState({ latitude: 0.7893, longitude: 113.9213 })


    return (
        <Marker position={[location.latitude, location.longitude]} icon={new Icon({
            iconUrl: "/pharma-marker.png",
            iconSize: [48, 48],
            iconAnchor: [24, 48],
        })}>
            <Popup>
                Current Location
            </Popup>
        </Marker>
    )
}
export default Markers;