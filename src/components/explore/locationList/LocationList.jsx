import LocationCard from "./locationCard/LocationCard"
import styles from "./locationlist.module.css"

const LocationList = ({locations, user}) => {    
    return (
        <div className={styles.container}>
        {locations.map((location) => (
            <div key={location._id} className={styles.card}>
            <LocationCard key={location.place_name} location={location} user={user}  />
            </div>
        ))}
        </div>
    )
}

export default LocationList