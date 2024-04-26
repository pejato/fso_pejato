import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const needsAuthedUser = useSelector((state) => state.auth === null);
  if (needsAuthedUser) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
