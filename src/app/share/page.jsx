import NewLocationForm from "@/components/share/NewLocationForm";
import { auth } from "@/lib/auth";
import { getUserByEmail } from "@/lib/data";

const AddNewLocation = async () => {
    // Get logged in user
    //  test 
    const session = await auth()
    const user = await getUserByEmail(session?.user.email)

    return (
        <main>
                <NewLocationForm user={user}/> 
        </main>
    )

}

export default AddNewLocation;