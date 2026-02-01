import "./PostCard.css";

function PostCard({ title, author, subreddit, upvotes, comments, image, video }) {
  return (
    <article className="post-card">
      <h2 className="post-title">{title}</h2>

      <p className="post-meta">
        Posted by <span className="post-author">{author}</span> in{" "}
        <br />
        <span className="post-subreddit">r/{subreddit}</span>
      </p>

      {/* -------- Stats -------- */}
      <div className="post-stats">
        <span>⬆️ {upvotes}</span>
        <span>💬 {comments}</span>
      </div>

      {/* -------- Image -------- */}
      {image && (
        <img src={image} alt={title} className="post-image" />
      )}

      {/* -------- Video -------- */}
      {video && (
        <video controls className="post-video">
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </article>
  );
}

export default PostCard;
