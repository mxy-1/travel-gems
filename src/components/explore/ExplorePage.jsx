'use client';

import { useEffect, useState } from 'react';
import GoogleMapView from './GoogleMapView/GoogleMapView';
import styles from './explorepage.module.css'
import MapAndListButtons from './filterAndView/Map&ListButons/Map&ListButtons';
import MapsNavigation from './filterAndView/mapsNavigation/MapsNavigation';
import LocationList from './locationList/LocationList';


const ExplorePage = ({ allLocations, user }) => {
    const [locations, setLocations] = useState(allLocations)
    const [mapView, setMapView] = useState(true)
    const [filterOptions, setFilterOptions] = useState({})
    const [addLocation, setAddLocation] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState({})

    useEffect(() => {
        let filteredLocations = allLocations
        for (const [key, value] of Object.entries(filterOptions)) {
            // Rating filter
            if (key === 'rating') {
                filteredLocations = filteredLocations.filter((location) => {
                    return location.rating >= value
                })
            }

            // Category filter
            if (key === 'categories') {
                filteredLocations = filteredLocations.filter((location) => {
                    return value.every(r => location.categories.includes(r))
                })
            }

        }

        setLocations(JSON.parse(JSON.stringify(filteredLocations)))

    }, [filterOptions])

    return (
        <>
            <MapsNavigation filterOptions={filterOptions} setFilterOptions={setFilterOptions} addLocation={addLocation} setAddLocation={setAddLocation} setSelectedLocation={setSelectedLocation} />
            <MapAndListButtons mapView={mapView} setMapView={setMapView} />
            <div className={`${mapView === true && styles.disabled}`}>
                <LocationList locations={locations} user={user} />
            </div>
            <div className={`${mapView === false && styles.disabled}`}>
                <GoogleMapView user={user} locations={locations} addLocation={addLocation} setAddLocation={setAddLocation} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}/>
            </div>
        </>
    )
}

export default ExplorePage;