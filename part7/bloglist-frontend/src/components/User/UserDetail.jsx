import { useParams } from 'react-router-dom';
import { useGetUserQuery } from '../../api/apiSlice';

function UserDetail() {
  const { id } = useParams();
  const { data: user, isLoading } = useGetUserQuery(id);

  if (isLoading) {
    return null;
  }
  const createdBlogsContent =
    user.blogs.length === 0 ? (
      <div>Nothing here :&#40;</div>
    ) : (
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    );
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Created blogs</h3>
      {createdBlogsContent}
    </div>
  );
}
export default UserDetail;
