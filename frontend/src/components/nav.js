import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Nav = () => {
    const auth = localStorage.getItem('user')
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup')
    }

    return (
        <>
            <div>
                {
                    auth ? <ul className="nav-ul">
                        <li><Link to='/'>PRODUCT</Link></li>
                        <li><Link to='/add'>ADD</Link></li>
                        <li><Link to='/update'>UPDATE</Link></li>
                        <li><Link onClick={logout} to='/signup'>LOGOUT ({JSON.parse(auth).name})</Link></li>
                    </ul> :
                        <ul className="nav-ul">
                            <li><Link to='/login'>LOGIN</Link></li>
                            <li><Link to='/signup'>SIGNUP</Link></li>
                        </ul>
                }

            </div>
        </>
    )
}

export default Nav
