'use client';

import { useState } from 'react';
import GoogleMapView from './GoogleMapView/GoogleMapView';
import styles from './explorepage.module.css'
import MapAndListButtons from './filterAndView/Map&ListButons/Map&ListButtons';
import MapsNavigation from './filterAndView/mapsNavigation/MapsNavigation';
import LocationList from './locationList/LocationList';

const ExplorePage = ({ locations }) => {
    const [mapView, setMapView] = useState(true)

    return (
        <>
        <MapsNavigation />
        <MapAndListButtons mapView={mapView} setMapView={setMapView}/>
        <div className={`${mapView === true && styles.disabled}`}>
        <LocationList locations={locations} />
        </div>
        <div className={`${mapView === false && styles.disabled}`}>
        <GoogleMapView locations={locations} />
        </div>
        </>
        )
}

export default ExplorePage;