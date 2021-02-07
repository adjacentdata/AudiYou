import React, { useState } from 'react'
import {Button, Input } from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import './SignUp.css'
import { useAuth } from '../useContextFolder/AuthProvider.js/AuthProvider'
import {Link, useHistory} from 'react-router-dom'

function SignUp(){
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [newSignIn, setSignIn] = useState(false)
    const { newSignUp } = useAuth()
    const [error, setError] = useState('')
    const signInRedirect = useHistory()

    async function handleSignUpConfirmed(e) {
        e.preventDefault()

        if (password !== passwordConfirm){
            return setError('Passwords do not match')
        }
        try{
            setSignIn(true)
            setError("")
            await newSignUp(email, password, username)
            signInRedirect.push('/')
        }catch{
            setError("Failed to create account")
        }

        setSignIn(false)
        setEmail('')
        setUsername('')
        setPassword('')
        setPasswordConfirm('')
    }

    return(
        <div className = "wrapper">
            <div className = "header">
                <img src = "./images/AudiYou.png" alt ="My Logo" class = "img-logo" />
            </div>
            <form className= "card">
                <h1>Sign Up</h1>
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
                        placeholder="Username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                    <Input
                        placeholder="Retype Password"
                        type="password"
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        fullWidth
                        value={passwordConfirm}
                        style={{marginTop: "15px", border: '2px solid black'}}

                    />
                    <Button
                        style={{marginTop: "20px"}}
                        type= "submit"
                        onClick={handleSignUpConfirmed}
                        color="secondary"
                        disabled= {newSignIn}
                        variant="contained">
                            Sign Up!
                    </Button>
                    <div className="log-in-link">
                        Already have an account? <Link to="/login">Log in</Link>
                    </div>
                </div>

            </form>

        </div>
    )
}

export default SignUp
