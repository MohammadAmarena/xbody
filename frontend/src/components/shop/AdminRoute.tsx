import { Navigate } from 'react-router-dom'
import { ProtectedRouteProps } from '../../types/ProtectedRouteProps'

export default function AdminRoute({
  isAdmin,
  authenticationPath,
  outlet,
}: ProtectedRouteProps) {
  if (isAdmin) {
    return outlet
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />
  }
}
