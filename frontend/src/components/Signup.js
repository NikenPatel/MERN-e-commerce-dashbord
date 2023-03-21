import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

const SignUp = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();


    useEffect(() => {
        const auth = localStorage.getItem('user')
        if (auth) {
            navigate('/')
        }
    })


    const handleCollectData = async () => {
        // console.log(name, email, password);

        if (name !== "" && email !== "" && password !== "") {
            let result = await fetch('http://localhost:5000/register', {
                method: 'post',
                body: JSON.stringify({ name, email, password }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            result = await result.json()
            // console.log(result);
            localStorage.setItem('user', JSON.stringify(result.result))
            localStorage.setItem('token', JSON.stringify(result.auth))
            if (result) {
                navigate('/')
            }
        } else {
            alert('Please Enter Data')
        }
    }

    return (
        <div className="register">
            <h1>Register</h1>
            <input className="inputbox" type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter name" />
            <input className="inputbox" type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter email" />
            <input className="inputbox" type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter password" />
            <button className="button" onClick={handleCollectData}>Sign up</button>
        </div>
    )
}

export default SignUp