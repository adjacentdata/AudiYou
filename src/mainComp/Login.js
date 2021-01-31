import React, { useEffect,useState } from 'react'
import {Button, Input } from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import './SignUp.css'
import {authorization} from "./firebaseConsole"
import { useAuth } from '../useContextFolder/AuthProvider.js/AuthProvider'
import {AuthProvider, newUser} from '../useContextFolder/AuthProvider.js/AuthProvider'
import {Link, useHistory} from 'react-router-dom'

function Login(){
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [newLogIn, setLogIn] = useState(false)
    const { loginToWebsite } = useAuth()
    const [error, setError] = useState('')
    const signInRedirect = useHistory()


    async function handleLogInConfirmed(e) {
        e.preventDefault()
        try{
            setLogIn(true)
            setError("")
            await loginToWebsite(email, password)
            signInRedirect.push('/')
        }catch{
            setError("Failed to log in")
        }

        setLogIn(false)
        setEmail('')
        setUsername('')
        setPassword('')
    }


    return(
        <div className = "wrapper">
            <div className = "header">
                <img src = "./images/AudiYou.png" alt ="My Logo" class = "img-logo" />
            </div>
            <form className= "card">
                <h1>Log In!</h1>
                {error && <Alert severity="error">
                    {error}
                </Alert>}
                <div className="inputs">
                    <Input
                        placeholder="Email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        style={{marginTop: "15px", border: '2px solid black'}}
                    />
                    <Input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        style={{marginTop: "15px", border: '2px solid black'}}

                    />
                    <Button
                        style={{marginTop: "20px"}}
                        type= "submit"
                        onClick={handleLogInConfirmed}
                        color="secondary"
                        disabled= {newLogIn}
                        variant="contained">
                            Log In!
                    </Button>
                    <div className="log-in-link">
                        Need an account? <Link to="/signup">Sign Up</Link>
                    </div>
                </div>

            </form>

        </div>
    )
}

export default Login
