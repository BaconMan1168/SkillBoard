import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../api';
import PostList from '../posts/PostList';
import CreatePost from '../posts/CreatePost';
import styles from "./TopicPage.module.css";

export default function TopicPage() {
    const { topicId } = useParams();
    const [posts, setPosts] = useState([]);
    const [topicTitle, setTopicTitle] = useState('')

    const fetchPosts = () => {
        api.get(`/topics/${topicId}`).then(res => {
            setPosts(res.data.posts);
            setTopicTitle(res.data.topic.title); 
        });
    };

    useEffect(() => { 
        fetchPosts(); 
    }, [topicId]);


    return (
        <div className={styles.pageWrapper}>
            <div className={styles.topicContainer}>
                <h2 className={styles.heading}>{topicTitle}</h2>

                <div className={styles.createBox}>
                    <CreatePost topicId={topicId} onPostCreated={fetchPosts} />
                </div>

                <PostList posts={posts} onPostAction={fetchPosts} />
            </div>
        </div>
    );
}
