import styles from './Comment.module.css';

export default function Comment({ comment }) {
    return (
        <div className={styles.comment}>
            <p><strong>{comment.author.name}:</strong> {comment.body}</p>
            <small>{new Date(comment.createdAt).toLocaleString()}</small>
        </div>
    );
}