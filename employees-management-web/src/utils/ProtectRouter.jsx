import { Outlet, Navigate } from 'react-router-dom'
const ProtectRouter = () => {
  const user = localStorage.getItem("token")
  return user  ? <Outlet/> : <Navigate to="/login"/>
}

export default ProtectRouter