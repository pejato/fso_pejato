import { useParams } from 'react-router-dom';
import { useGetUserQuery } from '../../api/apiSlice';

function UserDetail() {
  const { id } = useParams();
  const { data: user, isLoading } = useGetUserQuery(id);

  if (isLoading) {
    return null;
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Created blogs</h3>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  );
}
export default UserDetail;
