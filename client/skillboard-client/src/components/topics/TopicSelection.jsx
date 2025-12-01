import { useEffect, useState } from 'react';
import { api } from '../../api';
import { useNavigate } from 'react-router-dom';
import styles from './TopicSelection.module.css'

export default function TopicSelection() {
    const [allTopics, setAllTopics] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [newTopic, setNewTopic] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/topics').then(res => setAllTopics(res.data));
        api.get('/topics/me').then(res => setSelectedTopics(res.data.topics.map(t => t.id)));
    }, []);

    const toggleTopic = (id) => {
        setSelectedTopics(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
    };

    const handleSubmit = async () => {
        await api.put('/topics/select', { topics: selectedTopics });
        navigate('/'); 
    };

    const handleCreateTopic = async () => {
        if (!newTopic.trim()) return;

        try {
            const res = await api.post('/topics/create', { title: newTopic });
            const topic = res.data;

            setAllTopics(prev => [...prev, topic]);
            setSelectedTopics(prev => [...prev, topic.id]);

            setNewTopic('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.topicSelectionContainer}>
                <h2>Select Your Topics</h2>

                <div className={styles.newTopicContainer}>
                    <input
                        type="text"
                        placeholder="Add a new topic"
                        value={newTopic}
                        onChange={e => setNewTopic(e.target.value)}
                    />
                    <button onClick={handleCreateTopic}>Add</button>
                </div>

                <ul>
                    {allTopics.map(topic => (
                        <li key={topic.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedTopics.includes(topic.id)}
                                    onChange={() => toggleTopic(topic.id)}
                                />
                                {topic.title}
                            </label>
                        </li>
                    ))}
                </ul>

                <button className={styles.saveButton} onClick={handleSubmit}>
                    Save Topics
                </button>
            </div>
        </div>
    );
}
