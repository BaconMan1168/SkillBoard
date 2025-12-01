import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { api } from '../../api';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        if (user) api.get('/topics/me').then(res => setTopics(res.data.topics));
    }, [user, topics]);

    return (
        <nav className={styles.navbar}>
            <Link to='/' className={styles.navLink}>Home</Link>
            <Link to='/posts' className={styles.navLink}>Your Posts</Link>
            <Link to='/topics/select' className={styles.navLink}>Set Topics</Link>

            {topics.map(topic => <Link className={styles.navLink} key={topic.id} to={`/topics/${topic.id}`}>{topic.title}</Link>)}

            <Link to='/login' className={styles.navLink} onClick={logout}>Logout</Link>
        </nav>
    );
}
