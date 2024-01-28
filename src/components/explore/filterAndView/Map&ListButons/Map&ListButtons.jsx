const MapAndListButtons = ({mapView, setMapView}) => { 

    const handleClick = () => {
        setMapView((current) => {
            return !current
        })
    }

    return ( 
        <div className="join w-full p-2 mb-5 flex items-center"> 
            <button onClick={handleClick} className={`btn btn-neutral join-item w-1/2 no-animation text-2xl ${mapView === true && "btn-disabled"}`}> Map View</button>
            <button onClick={handleClick} className={`btn btn-neutral join-item w-1/2 no-animation text-2xl ${mapView === false && "btn-disabled"}`}> List View </button>
        </div>
    )
}

export default MapAndListButtons