import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useAuth} from '../useContextFolder/AuthProvider.js/AuthProvider'
// Sourced from Web Dev Simplified on Youtube Video React Authentication with React Routers.
function PrivateRoute({component: Component,...rest}){
    const {newUser} = useAuth()
    return(
        <Route {...rest} render={props=>{
            return newUser ? <Component {...props}/> :<Redirect to="/login" />
        }}>
        </Route>
    )
}

export default PrivateRoute
