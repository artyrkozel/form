import {Link} from "react-router-dom";

const RegisterForm = ({registerHandler, changeHandler, errors}) => {
    return(
        <div className="login">
            <div className="container">
                <div className="login__inner">
                    <div className="login__form">
                        <div className="wrapper">
                            <h2 className="login__form-title">Create Account</h2>
                            <form onSubmit={e => e.preventDefault()}>
                                <div className="form-group">
                                    <label htmlFor="email" className="label">Email</label>
                                    <input type="text" name="email" onChange={changeHandler} className="input"
                                           placeholder="Email"/>
                                    {errors.email && <p className="error-message">{errors.email}</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="label">Password</label>
                                    <input type="password" name="password" onChange={changeHandler} className="input"
                                           placeholder="Password"/>
                                    {errors.password && <p className="error-message">{errors.password}</p>}
                                </div>
                                <div className="form-group">
                                    <button className="form-group" onClick={registerHandler}>
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="login__right">
                        <div className="text">
                            <h1 className="text__title">Welcome Back</h1>
                            <p className="text__description">To keep connected please login with your info</p>
                            <Link to="/login">
                                <button className="text__button">Sign In</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RegisterForm