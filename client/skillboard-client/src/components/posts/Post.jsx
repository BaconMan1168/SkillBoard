import { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { api } from '../../api';
import Comment from '../comments/Comment';
import styles from "./Post.module.css"

export default function Post({ post, onPostAction }) {
    const { user } = useContext(AuthContext);
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(post.title);
    const [body, setBody] = useState(post.body);
    const [showComments, setShowComments] = useState(false)
    const [newComment, setNewComment] = useState('');

    const updatePost = async () => {
        await api.put(`/posts/${post.id}`, { title, body });
        setEditing(false);
        onPostAction();
    };

    const deletePost = async () => {
        await api.delete(`/posts/${post.id}`);
        onPostAction();
    };

    const submitComment = async () => {
        if (!newComment.trim()) return;
        await api.post(`/comments/${post.id}`, { body: newComment }); 
        setNewComment('');
        onPostAction(); 
        
    };

    return (
        <div className={styles.post}>
            {editing ? (
                <>
                    <input className={styles.editInput} value={title} onChange={e => setTitle(e.target.value)} />
                    <textarea className={styles.editTextarea} value={body} onChange={e => setBody(e.target.value)} />
                    
                    <div className={styles.buttonGroup}>
                        <button onClick={updatePost}>Save</button>
                        <button onClick={() => setEditing(false)}>Cancel</button>
                    </div>
                </>
            ) : (
                <>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                    <small>By {post.author.name} on {new Date(post.createdAt).toLocaleString()}</small>

                    {user?.id === post.author.id && (
                        <div className={styles.buttonGroup}>
                            <button onClick={() => setEditing(true)}>Edit</button>
                            <button onClick={deletePost}>Delete</button>
                        </div>
                    )}
                </>
            )}

            <div className={styles.commentsSection}>
                <h4>Comments</h4>

                {showComments ? (
                    <>
                        <button onClick={() => setShowComments(false)}>Hide Comments</button>

                        {post.comments.map(c => (
                            <Comment key={c.id} comment={c} />
                        ))}

                        {user && (
                            <div className={styles.commentInputBox}>
                                <input
                                    value={newComment}
                                    placeholder="Write a comment..."
                                    onChange={e => setNewComment(e.target.value)}
                                    className={styles.commentInput}
                                />
                                <button onClick={submitComment}>Submit</button>
                            </div>
                        )}
                    </>
                ) : (
                    <button onClick={() => setShowComments(true)}>Show Comments</button>
                )}
            </div>
        </div>
    );
}
