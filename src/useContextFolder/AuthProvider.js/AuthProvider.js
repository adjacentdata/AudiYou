import React, {useContext, useEffect, useState} from 'react'
import { authorization } from '../../mainComp/firebaseConsole'

//intitialize Context
const UserContext = React.createContext()

function useAuth(){
    return useContext(UserContext)
}

function AuthProvider({children}){
    const [newUser, setNewUser] = useState()
    const [newSignIn, setNewSignIn] = useState()
    const [username, setUsername] = useState('')
    function newSignUp(email, password, username){
        return (
            authorization.createUserWithEmailAndPassword(email, password)
            .then((authUser)=>{
                authUser.user.updateProfile({
                    displayName: username,
                })
            })
            .catch((error)=> alert(error.message))
        )
    }


    function loginToWebsite(email, password){
        return(
            authorization.signInWithEmailAndPassword(email, password)
            .catch((error)=> alert(error.message))
        )

    }

    function signOut(){
        return authorization.signOut()
    }

    useEffect(() => {
        const unsubscribe = authorization.onAuthStateChanged(authUser => {
            setNewUser(authUser)
            setNewSignIn(false)
        })
        return unsubscribe
    }, [])

    const val = {
        newUser,
        newSignUp,
        loginToWebsite,
        signOut
    }

    return(
        <UserContext.Provider value= {val}>
            {!newSignIn && children}
        </UserContext.Provider>
    )
}

export {useAuth, AuthProvider}
