import "./PostCard.css";

function PostCard({title, author,subreddit, upvotes, comments}){
return (
    <article className="post-card">
        <h2 className= "post-title">{title}</h2>

        <p className="post-meta">
            Posted by <span className="post-suthor">{author}</span> in{" "}
            <span className="post-subreddit">r/{subreddit}</span>
        </p>
        <div className="post-stats">
        <span>⬆️ {upvotes}</span>
        <span>💬 {comments}</span>
        </div>
    </article>
)
};
export default PostCard;