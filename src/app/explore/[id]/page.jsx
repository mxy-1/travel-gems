import LocationCard from '@/components/location/locationCard/LocationCard';
import ReviewWrapper from '@/components/location/reviews/ReviewWrapper';
import { getLocationById } from '@/lib/data';
import { getUserByEmail } from '@/lib/data';
import { auth } from '@/lib/auth';

const SingleLocationPage = async ({ params }) => {

    const id = params.id
    const session = await auth()
  
    let user = await getUserByEmail(session?.user.email)
    user = JSON.parse(JSON.stringify(user))

    let location = await getLocationById(id)
    location = JSON.parse(JSON.stringify(location[0]))

    return (
        <>
        <LocationCard  location ={location} user={user} /> 
        <ReviewWrapper id ={id} placeName ={location.place_name} user={user}/> 
        </>
    )
}

export default SingleLocationPage;