import { Icon } from "leaflet";
import { Marker as LeafletMarker, Popup, useMap } from "react-leaflet";

interface MapProps {
    name: string;
    latitude: number;
    longitude: number;
    markerIcon?: string;
}

const Marker = ({
    latitude,
    longitude,
    name,
    markerIcon
}: MapProps) => {

    const map = useMap();

    return (
        <LeafletMarker
            position={[latitude, longitude]}
            icon={new Icon({
                iconUrl: markerIcon ?? "/marker.jpg",
                iconSize: [48, 48],
                iconAnchor: [24, 48],
            })}
            eventHandlers={{
                click: () => {
                    map.flyTo([latitude, longitude]);
                }
            }}
        >
            <Popup>
                {name}
            </Popup>
        </LeafletMarker>
    )
}

export default Marker;