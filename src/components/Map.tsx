import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ReactNode, useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';



interface MapProps {
    children: ReactNode;
    latitude: number;
    longitude: number;
}

export const CurrentLocationMarker = ({
    latitude,
    longitude
}: Omit<MapProps, "children">) => {

    const map = useMap();

    return (
        <Marker
            position={[latitude, 113.9213]}
            icon={new Icon({
                iconUrl: "/marker.jpg",
                iconSize: [48, 48],
                iconAnchor: [24, 48],
            })}
            eventHandlers={{
                click: () => {
                    map.flyTo([latitude, 113.9213]);
                }
            }}
        >
            <Popup>
                Current Location
            </Popup>
        </Marker>
    )
}

const Map = ({
    children,
    latitude,
    longitude
}: MapProps) => {

    // const map = useMap();

    return (
        <MapContainer center={[latitude, longitude]} zoom={latitude === 0.7893 && longitude === 113.9213 ? 10 : 15} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
            <TileLayer
                attribution={
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }
                url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
            />
            <Marker
                position={[latitude, longitude]}
                icon={new Icon({
                    iconUrl: "/marker.jpg",
                    iconSize: [48, 48],
                    iconAnchor: [24, 48],
                })}
            >
                <Popup>
                    Current Location
                </Popup>
            </Marker>
            {children}
        </MapContainer>
    )
}

export default Map