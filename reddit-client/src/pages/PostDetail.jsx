import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./PostDetail.css";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = useSelector((state) =>
    state.posts.posts.find((p) => p.id === id),
  );

  if (!post) return <p>Post nicht gefunden...</p>;

  // Video hat Priorität, sonst Bild
  const media = post.video ? (
    <video controls className="post-video">
      <source src={post.video} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  ) : post.image ? (
    <img src={post.image} alt={post.title} className="post-image" />
  ) : null;

  return (
    <div className="post-detail">
      <button className="back-button" onClick={() => navigate(-1)}>
        ⬅️ Zurück
      </button>

      <h1 className="post-title">{post.title}</h1>
      <p className="post-meta">
        Posted by <strong>{post.author}</strong> in{" "}
        <strong>r/{post.subreddit}</strong>
      </p>
      <div className="post-stats">
        <span>⬆️ {post.upvotes}</span>
        <span>💬 {post.comments}</span>
      </div>

      {media}
    </div>
  );
}

export default PostDetail;
