import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { api } from '../../api';
import PostList from '../posts/PostList';
import styles from "./UserPosts.module.css";

export default function UserPosts() {
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);

    const fetchPosts = () => {
        if (!user) return;
        api.get(`/posts`).then(res => setPosts(res.data));
    };

    useEffect(() => {
        fetchPosts(); 
    }, [user]); 

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.postsContainer}>
                <h2 className={styles.heading}>Your Posts</h2>
                <PostList posts={posts} onPostAction={fetchPosts} />
            </div>
        </div>
    );
}
