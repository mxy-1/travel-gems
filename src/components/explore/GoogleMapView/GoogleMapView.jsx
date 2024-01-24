"use client"
import { GoogleMap, Marker, InfoWindow, useLoadScript, MarkerF } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import Image from 'next/image'
import style from "./googleMap.module.css"
import Link from 'next/link';
import { LiaLocationArrowSolid } from "react-icons/lia"
import { calculateDistance } from '@/lib/distance';


const GoogleMapView = ({ user, locations, addLocation, setAddLocation, selectedLocation, setSelectedLocation }) => {
    const [mapCoords, setMapCoords] = useState({ lat: 51.507351, lng: -0.127758 })
    const [coordinates, setCoordinates] = useState({});
    const [selectLocation, setSelectLocation] = useState("");
    const [distance, setDistance] = useState(0);
    const [geoLocation, setGeoLocation] = useState(false);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude })
            setGeoLocation(true)
        })
        const calculatedDistance = calculateDistance(coordinates.lat, coordinates.lng, selectLocation.latitude, selectLocation.longitude)
        setDistance(calculatedDistance.toFixed(1))
        if (selectLocation) setAddLocation(false)
    }, [selectLocation]);


    useEffect(() => {
        navigator.permissions.query({ name: "geolocation" }).then(result => {
            if (result.state === "granted") {
                setMapCoords(coordinates)
            }
        })
    }, [geoLocation]);

    const containerStyle = {
        width: '80vw',
        height: '45vh',
        margin: 'auto',
    };

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    });

    function stringLimit(str, limit) {
        if (str.length <= limit) {
            return str
        } else {
            return str.slice(0, limit)
        }
    }

    const handleMarkerClick = (location) => {
        setSelectLocation(location)
    };

    const handleInfoWindowClose = () => {
        setSelectLocation("");
    };

    const handleDirectionsClick = () => {
        window.open('https://www.google.com/maps/dir/?api=1&origin=' +
            coordinates.lat + ',' + coordinates.lng + '&destination='
            + selectLocation.latitude
            + ',' + selectLocation.longitude + '&travelmode=driving')
    }

    const handleMapClick = (e) => {
        setSelectedLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() })
    }

    return (
        <div>
            {isLoaded && <GoogleMap
                onClick={handleMapClick}
                mapContainerStyle={containerStyle}
                center={mapCoords}
                zoom={12}
            >
                {locations.map((location) => (
                    <Marker
                        position={{ lat: location.latitude, lng: location.longitude }}
                        key={location._id}
                        onClick={() => handleMarkerClick(location)}
                        icon={{
                            url: "/travel_icon.svg",
                            scaledSize: {
                                width: 40,
                                height: 40
                            }
                        }}
                        animation={2}
                    />
                ))}

                {addLocation && <MarkerF
                    position={selectedLocation}
                    icon={{
                        url: "/travel_icon.svg",
                        scaledSize: {
                            width: 40,
                            height: 40
                        }
                    }}>
                    <InfoWindow onCloseClick={() => setAddLocation(false)}>
                        <Link href={user ? `/share?latitude=${selectedLocation.lat}&longitude=${selectedLocation.lng}` : `/login`}>
                            <p>Add new travel gem</p>
                        </Link>
                    </InfoWindow>
                </MarkerF>}

                {selectLocation && (
                    <InfoWindow
                        position={{
                            lat: selectLocation.latitude,
                            lng: selectLocation.longitude,
                        }}
                        onCloseClick={handleInfoWindowClose}
                    >
                        <div className={style.popupWrapper}>
                            <Image
                                src={selectLocation.img}
                                alt=''
                                width={100}
                                height={100}
                            />
                            <div className={style.popText}>

                                <Link href={`/explore/${selectLocation._id}`}>
                                    <h4><strong>{selectLocation.place_name}</strong></h4>
                                </Link>
                                <p>{selectLocation.category}</p>
                                <p> {`${stringLimit(selectLocation.description, 100)}...`}</p>
                                {geoLocation && <p className={style.directions} onClick={handleDirectionsClick}>
                                    <LiaLocationArrowSolid /> {distance} mi</p>}
                            </div>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
            }
        </div>
    );
};

export default GoogleMapView;
