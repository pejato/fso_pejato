import { Link } from 'react-router-dom';
import { useGetUsersQuery } from '../../api/apiSlice';

function UserList() {
  const { data: users, isLoading } = useGetUsersQuery();
  if (isLoading) {
    return null;
  }
  const userContent = (
    <table>
      <thead>
        <tr>
          <th scope="col" aria-label="users" />
          <th scope="col">blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => {
          return (
            <tr key={u.username}>
              <td>
                <Link to={`/users/${u.id}`}>{u.name}</Link>
              </td>
              <td>{u.blogs.length}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
  return (
    <div>
      <h2>Users</h2>
      {userContent}
    </div>
  );
}

export default UserList;
