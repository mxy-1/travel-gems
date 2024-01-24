import styles from './header.module.css'
import { handleLogout } from '@/lib/action';
import { auth } from '@/lib/auth';
import NavLink from '../navbar/links/navlink/NavLink';
import Link from 'next/link';

const Header = async () => {

    // Know if user is logged in
    const session = await auth();

    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <img className={styles.logo} src="../travel_logo.png" alt="travel gems logo" />
                <Link href="/explore"><img className= {styles.header} src="../travel_header_new.png" alt="travel gems logo" /></Link>
            </div>
            <div className={styles.auth}>
                {!session ?
                <NavLink item={{
                    title: 'Login',
                    path: '/login',
                    icon: 'login',
                }}/>
                :
                <form action={handleLogout}>
                    <button className={styles.logout}>Log Out</button>
                </form>
                }
            </div>
        </div>
    )
}

export default Header;