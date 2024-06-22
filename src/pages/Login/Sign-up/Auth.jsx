
import {Outlet , Navigate } from "react-router-dom"
import { isloggedin } from './isloggedin'
const Privatepage = () => {
    console.log ("tist is the error",isloggedin)
  return (
    <>
        {isloggedin() ? <Outlet></Outlet> : <Navigate to= "/Login"></Navigate>}
    </>
  )
}

export default Privatepage;