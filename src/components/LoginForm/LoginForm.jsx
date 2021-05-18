import {Link} from "react-router-dom";


const LoginForm = ({loginHandler, changeHandler, errors}) => {
    return (
        <div className="login">
            <div className="container">
                <div className="login__inner">
                    <div className="login__form">
                        <div className="wrapper">
                            <h2 className="login__form-title">Sign In</h2>
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
                                    <button className="form-group" onClick={loginHandler}>
                                        Sign In
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="login__right">
                        <div className="text">
                            <h1 className="text__title">Welcome to login</h1>
                            <p className="text__description">Don't have an account?</p>
                            <Link to="/registration">
                                <button className="text__button">Sign Up</button>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm