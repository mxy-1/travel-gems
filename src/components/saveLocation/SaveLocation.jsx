'use client'

import { saveLocationAction } from '@/lib/action';
import styles from './saveLocation.module.css';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { MdBookmarkAdd } from "react-icons/md";
import { MdBookmarkRemove } from "react-icons/md";

const SaveLocation = ({id, user}) => {
    const [isSaved, setIsSaved] = useState(user?.savedLocations.includes(id))
    const [error, setError] = useState(false)
    
    let pathname = usePathname()

    const handleSaveLocation = async (id, user) => {
        try {
            await saveLocationAction(id, user.email);
            setIsSaved((prev) => {return !prev})
        } catch (error) {
            console.log(error)
            setError(true)
        }
    }
    
    return (
        <div className={styles.container}>
            <button onClick={() => handleSaveLocation(id, user)} className={`${styles.button} ${isSaved && styles.active}`}   >
            {isSaved ? <MdBookmarkRemove size={20}  /> : <MdBookmarkAdd size={20} />} {isSaved ? 'Unsave' : 'Save'}
            </button>
            {error && "Try again later"}
        </div>
    )
}

export default SaveLocation;