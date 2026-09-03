import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const ProtectedRoute = () => {

  const {
    checkAuth,
    isAuthenticated
  } = useSelector((state) => state.auth)

  // Still checking authentication
  if (checkAuth) {
    return <div>Loading...</div>
  }

  // Authentication check finished but user isn't logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // User is authenticated
  return <Outlet />
}

export default ProtectedRoute