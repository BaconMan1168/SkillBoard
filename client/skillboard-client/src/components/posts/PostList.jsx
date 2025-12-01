import Post from './Post';

export default function PostList({ posts, onPostAction }) {
    return ( 
        <>
            {posts && posts.length > 0 && ( 
                <div>
                    {posts.map(post => <Post key={post.id} post={post} onPostAction={onPostAction} />)}
                </div>
            )}
        </>
    );
}
