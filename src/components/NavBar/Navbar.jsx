import React, {useContext} from 'react'
import {AuthContext} from "../../context/AuthContext";

const Navbar = () => {
    const {logout, isLogin} = useContext(AuthContext)

    return(
        <nav className="navbar">
            <div className="container">
                {isLogin
                    ? <a className="text__button navbar__btn" href="/" onClick={logout}>Sign Out</a>
                    : <a className="text__button navbar__btn" href="/">Sign In</a>
                }
            </div>
        </nav>
    )
}

export default Navbar