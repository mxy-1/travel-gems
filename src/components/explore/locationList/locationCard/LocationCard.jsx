import styles from './locationcard.module.css'
import Link from 'next/link'
import SaveLocation from '@/components/saveLocation/SaveLocation'
import { CiShoppingTag } from "react-icons/ci";

const LocationCard = ({location, user}) => {

    let roundedRating;
    if (location.rating) {
        roundedRating = location.rating.toFixed(1)
    }

    return (
        <div className="card bg-base-100 shadow-xl">
            <figure><img className='w-full h-48 object-cover' src={location.img} alt="" /></figure>

            <div className="card-body rounded-b-lg bg-indigo-400">
                    <div className = "absolute top-3 left-3 right-3">
                    <Link href={`/explore/${location._id}`}>
                        <h2 className="card-title text-sm  text-gray-800 bg-white bg-opacity-75 p-4 rounded-lg w-fit">{location.address}</h2>   
                    </Link>
                            
                        <div className="stats shadow w-40 w-fit mt-2 bg-opacity-75 rounded-lg stats-compact">
    
                            <div className="stat text-md">
                                <div className="stat-title">stars out of 5</div>
                                <div className="stat-value">{roundedRating}</div>
                            </div>
                            
                        </div>
                    </div>
                <p>{location.description}</p>
                <div className={styles.footer}>
                    <div className={styles.categories}>
                    {location.categories.map(category => (
                                <button key={category} className="btn btn-primary mr-4 btn-sm glass">
                                    <CiShoppingTag />
                                    <em>{category} </em>
                                </button>
                            ))}
                    </div>
                    {user && <SaveLocation id={location._id.toString()} user={user}/>}
                </div>
            </div>
        </div>
    )
}

export default LocationCard