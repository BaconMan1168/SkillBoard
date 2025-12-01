import { useState } from 'react';
import { api } from '../../api';
import styles from "./CreatePost.module.css";

export default function CreatePost({ topicId, onPostCreated }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post(`/topics/${topicId}`, { title, body });
        setTitle('');
        setBody('');
        onPostCreated();
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input 
                required
                className={styles.input}
                placeholder="Title" 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
            />

            <textarea 
                required
                className={styles.textarea}
                placeholder="Body" 
                value={body} 
                onChange={e => setBody(e.target.value)} 
            />

            <button type="submit" className={styles.submitButton}>
                Create Post
            </button>
        </form>
    );
}
