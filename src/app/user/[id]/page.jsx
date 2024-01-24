import { getLocationsByUsername, getReviewsById, getUserById } from "@/lib/data"
import styles from './singleuser.module.css'
import Locations from "@/components/profile/Locations/Locations"
import Reviews from "@/components/profile/reviews/Reviews"

const SingleUserPage = async ({ params }) => {
    console.log(params, " ----------- params")
    const id = params.id
    let userReviews = []
    let locations = []
    let user
    
    if (id) {
        user = await getUserById(id)
        // user = user
        userReviews = await getReviewsById(id)
        locations = await getLocationsByUsername(user.username)    
    }
   
    return (
        <main className={styles.container}>

            <div className="stats shadow bg-indigo-400 m-2">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <div className="avatar online">
                            <div className="w-16 rounded-full">
                                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                    </div>
                    <div className="stat-value">{user.username}</div>
                    <div className="stat-title">{user.email}</div>
                </div>
            </div>

            <Reviews userReviews={userReviews} />
            <Locations locations={locations} />


        </main>
    )
}

export default SingleUserPage;