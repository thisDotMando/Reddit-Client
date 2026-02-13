import { Link } from "react-router-dom";
import "./PostCard.css";

function PostCard({
  id,
  title,
  author,
  subreddit,
  upvotes,
  comments,
  image,
  video,
}) {
  return (
    <Link to={`/post/${id}`} className="post-card-link">
      <article className="post-card" data-testid="post-card" data-e2e-id={id}>
        <h2 className="post-title">{title}</h2>
        <p className="post-meta">
          Posted by <span className="post-author">{author}</span> in{" "}
          <span className="post-subreddit">r/{subreddit}</span>
        </p>
        <div className="post-stats">
          <span>⬆️ {upvotes}</span>
          <span>💬 {comments}</span>
        </div>

        {/* Regel: Video hat Priorität */}
        {video ? (
          <video controls className="postCard-video">
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : image ? (
          <img src={image} alt={title} className="postCard-image" />
        ) : null}
      </article>
    </Link>
  );
}

export default PostCard;
