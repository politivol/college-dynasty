type Props = { post: { title: string; body?: string; images?: string[] } };
export function PostCard({ post }: Props) {
  return (
    <div className="border p-4 space-y-2">
      <h3 className="font-bold">{post.title}</h3>
      {post.body && <p>{post.body}</p>}
      {post.images && post.images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {post.images.map((src) => (
            <img key={src} src={src} alt="" />
          ))}
        </div>
      )}
    </div>
  );
}
export default PostCard;
