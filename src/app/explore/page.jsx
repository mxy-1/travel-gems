import {getLocations, getUserByEmail } from '@/lib/data';
import ExplorePage from '@/components/explore/ExplorePage';
import { auth } from '@/lib/auth';


const Home = async () => {
  // Get logged in user
  const session = await auth()
  // let user;

  let user = await getUserByEmail(session?.user.email)
  user = JSON.parse(JSON.stringify(user))

  // FETCHING WITHOUT API
  let allLocations = await getLocations();
  allLocations = JSON.parse(JSON.stringify(allLocations))

  return (
    <main>
      <ExplorePage allLocations={allLocations} user={user} />
    </main>
  );
};

export default Home;
