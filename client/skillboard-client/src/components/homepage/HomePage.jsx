import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { api } from '../../api';
import styles from './HomePage.module.css'

export default function HomePage() {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (user) api.get('/user').then(res => setProfile(res.data));
    }, [user]);

    if (!profile) return <div>Loading...</div>;

    return (
        <div className={styles.homeContainer}>
            <div className={styles.profileCard}>
                <h2 className={styles.sectionTitle}>Welcome, {profile.name}</h2>
                <p>Email: {profile.email}</p>
                <p>Joined: {new Date(profile.createdAt).toLocaleDateString()}</p>
                <p>Number of Posts: {profile.postCount}</p>
                <p>Number of Comments: {profile.commentCount}</p>
            </div>
        </div>
    );
}
