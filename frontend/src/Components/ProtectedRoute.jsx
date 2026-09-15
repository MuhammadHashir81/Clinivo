import { Navigate, Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Oval } from 'react-loader-spinner'
import { checkingAuth } from "../store/slices/authSlice"
import { useEffect } from "react"

const ProtectedRoute = ({children,loginPath}) => {

  const dispatch = useDispatch()

   useEffect(()=>{
    console.log('checking auth...')
    dispatch(checkingAuth())
   },[])

  const {checkAuth, isAuthenticated } = useSelector((state) => state.auth)

  // Still checking authentication
  if (checkAuth) {
    return (
      <div className="h-screen w-screen flex items-center justify-center ">
    <Oval height={40} width={40}/>
      </div>
    )

  }

  // Authentication check finished but user isn't logged in
  if (!isAuthenticated) {
    return <Navigate to={loginPath} replace />
  }

  // User is authenticated
  if (isAuthenticated) {
    return children
    
  }
  
}

export default ProtectedRoute