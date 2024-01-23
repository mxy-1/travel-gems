"use client"

import styles from "./LocationCard.module.css"
import SaveLocation from "@/components/saveLocation/SaveLocation"
import { deleteLocation } from "@/lib/action"


const LocationCard = async ({ location, user }) => {
    const locationId = location._id

    const handleDelete = async (locationId) => {
        try {
            const deleted = await deleteLocation(locationId)
            window.location.href = '/explore'
        } catch {
            console.log("DELETE Error in location card.jsx")
        }
    }

    return (
        <section className="mt-40 mb-5 w-5/6 mx-auto  ">

            <div className="card bg-base-100 shadow-xl">
                <figure><img className='w-full h-96 object-cover md:h-[1000px]' src={location.img} alt="" /></figure>

                <div className="card-body rounded-b-lg bg-indigo-400">

                    <div className="absolute top-3 left-3 right-3">
                        <h2 className="card-title text-sm  text-gray-800 bg-white bg-opacity-75 p-4 rounded-lg w-fit">{location.address}</h2>

                        <div className="stats shadow w-40 w-fit mt-5 bg-opacity-75 rounded-lg stats-compact">

                            <div className="stat">
                                <div className="stat-title">stars out of 5</div>
                                <div className="stat-value">{location.rating.toFixed(1)}</div>
                                <div className="stat-desc">found by {location.created_by}</div>
                            </div>

                        </div>
                    </div>

                    <div className={styles.desc}>
                        <p className="p-2">{location.description}</p>
                        {user && <SaveLocation id={location._id.toString()} user={user} />}
                    </div>

                    {user?.username === location.created_by &&
                        <div>
                            <button onClick={() => handleDelete(locationId)}>Delete</button>
                        </div>}


                    <div className="flex flex-col justify-evenly gap-4 sm:flex-row sm:gap-8">
                        {location.categories.map(category => (
                            <p className="badge badge-neutral" key={category}>
                                <em>{category} </em>
                            </p>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}

export default LocationCard
