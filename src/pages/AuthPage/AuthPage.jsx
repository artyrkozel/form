import React, {useState, useContext} from 'react'
import {BrowserRouter, Switch, Route, Link, useHistory} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
const AuthPage = () => {
    const history = useHistory()

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const {login} = useContext(AuthContext)

    const changeHandler = (event) => {
        setForm({...form, [event.target.name] : event.target.value})
    }

    const registerHandler = async () => {
        try {
            await axios.post('https://autorisation-form.herokuapp.com/api/auth/registration', {...form}, {
                headers: {
                    'Content-Type' : 'application/json'
                }})
                history.push('/')
        } catch (err) {
            console.log(err)
        }
    }

    const loginHandler = async () => {
        try {
            await axios.post('https://autorisation-form.herokuapp.com/api/auth/login', {...form}, {
                headers: {
                    'Content-Type' : 'application/json'
                }})
                .then(res => {
                    login(res.data.token, res.data.userId)
                })
        } catch (e) {
            console.log(e)
        }
    }


    return(
        <BrowserRouter>
            <Switch>
                <React.Fragment>
                    <div className="container">
                        <div className="auth-page">
                            <Route path="/login">
                                <h3>Авторизация</h3>
                                <form action="" className="form form-login" onSubmit={e => e.preventDefault()}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input type="text" name="email"  onChange={changeHandler} className="validate"/>
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="input-field col s12">
                                            <input type="password" name="password" onChange={changeHandler} className="validate"/>
                                            <label htmlFor="password">Password</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <button className="wawes-effect wawes-light btn blue" onClick={loginHandler}>
                                            Войти
                                        </button>
                                        <Link to="/registration" className="btn-outline btn-reg">Нет аккаунта?</Link>
                                    </div>
                                </form>
                            </Route>
                            <Route path="/registration">
                                <h3>Регистрация</h3>
                                <form action="" className="form form-login" onSubmit={e => e.preventDefault()}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input type="text" name="email" onChange={changeHandler} className="validate"/>
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="input-field col s12">
                                            <input type="password" name="password" onChange={changeHandler} className="validate"/>
                                            <label htmlFor="password">Password</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <button className="wawes-effect wawes-light btn blue" onClick={registerHandler}>
                                            Регистрация
                                        </button>
                                        <Link to="/login" className="btn-outline btn-reg">Уже есть аккаунт?</Link>
                                    </div>
                                </form>
                            </Route>
                        </div>
                    </div>
                </React.Fragment>
            </Switch>
        </BrowserRouter>
    )
}

export default AuthPage