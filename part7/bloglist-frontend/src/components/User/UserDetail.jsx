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
      <ul className="list-disc">
        {user.blogs.map((b) => (
          <li key={b.id} className="ml-4">
            {b.title}
          </li>
        ))}
      </ul>
    );
  return (
    <div className="m-4">
      <h2 className="font-bold">{user.name}</h2>
      <h3 className="font-bold">Created blogs</h3>
      {createdBlogsContent}
    </div>
  );
}
export default UserDetail;
