import React, { useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleCollectData = async () => {
        // console.log(email, password);
        let result = await fetch('http://localhost:5000/login', {
            method: "post",
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        // console.log(result);
        if (result.auth) {
            localStorage.setItem('user',JSON.stringify(result.user));
            localStorage.setItem('token',JSON.stringify(result.auth))
            navigate('/')
        } else {
            alert('Please Enter Correct Email and Password')
        }
    }

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    })

    return (
        <div className="login">
            <h1>Login</h1>
            <input className="inputbox" type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter email" />
            <input className="inputbox" type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter password" />
            <button onClick={handleCollectData} type="button" className="button">Login</button>
        </div>
    )
}

export default Login
