import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  useCreateBlogCommentMutation,
  useGetBlogCommentsQuery,
} from '../../api/apiSlice';
import { showNotification } from '../../reducers/notificationReducer';

export default function BlogComments({ blogId }) {
  const { data: comments, isLoading } = useGetBlogCommentsQuery(blogId);
  const [createComment, { isCreatingComment }] = useCreateBlogCommentMutation();
  const [commentText, setCommentText] = useState('');
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await createComment({ blogId, comment: commentText }).unwrap();
      setCommentText('');
    } catch (error) {
      dispatch(
        showNotification(error.data?.error ?? 'Something went wrong', true),
      );
    }
  };

  const createCommentContent = isLoading ? null : (
    <form onSubmit={onSubmit}>
      <input
        value={commentText}
        name="comment"
        className="form-input"
        type="text"
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button disabled={!commentText || isCreatingComment} type="submit">
        Create comment
      </button>
    </form>
  );
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
      {createCommentContent}
      {commentsContent}
    </div>
  );
}
