import { useMap } from "react-leaflet";
import { Icon } from 'leaflet';
import { useState } from "react";
import Marker from "./Marker";

const Markers = () => {
    const map = useMap();

    const [pharmas, setPharmas] = useState([
        {
            name: "Apotek Kimia Farma Kukusan",
            latitude: -6.359270,
            longitude: 106.816380,
        },
        {
            name: "Apotek Imani",
            latitude: -6.3715369172273055,
            longitude: 106.81307376462587,
        },
        {
            name: "Apotek Mariz",
            latitude: -6.358946332244537,
            longitude: 106.81641554121519
        },
    ])



    return pharmas.map((pharma, index) => (
        <Marker markerIcon="/pharma-marker.png" {...pharma} key={index} />
    ))
}
export default Markers;