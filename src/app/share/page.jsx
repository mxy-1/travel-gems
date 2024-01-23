import NewLocationForm from "@/components/share/NewLocationForm";
import { auth } from "@/lib/auth";
import { getUserByEmail } from "@/lib/data";

const AddNewLocation = async () => {
    // Get logged in user
    const session = await auth()
    let user = await getUserByEmail(session?.user.email)
    user = JSON.parse(JSON.stringify(user))
    
    return (
        <main>
            <NewLocationForm user={user} />
        </main>
    )

}

export default AddNewLocation;