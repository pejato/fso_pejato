import { useGetBlogCommentsQuery } from '../../api/apiSlice';

export default function BlogComments({ blogId }) {
  const { data: comments, isLoading } = useGetBlogCommentsQuery(blogId);
  const commentsContent = isLoading ? null : (
    <ul>
      {comments.map((c) => (
        <li key={c.id}>{c.text}</li>
      ))}
    </ul>
  );
  return (
    <div>
      <h3>Comments</h3>
      {commentsContent}
    </div>
  );
}
