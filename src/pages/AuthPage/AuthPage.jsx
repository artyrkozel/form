import React, {useState, useContext} from 'react'
import {BrowserRouter, Switch, Route, useHistory} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {Validate} from "../../validate";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
const AuthPage = () => {
    const history = useHistory()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})

    const {login} = useContext(AuthContext)

    const changeHandler = (event) => {
        setErrors({...errors, [event.target.name] : ''})
        setForm({...form, [event.target.name] : event.target.value})
    }
    const registerHandler = async () => {
        try {
            await setErrors(Validate(form))
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
            await setErrors(Validate(form))
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
                                <LoginForm loginHandler={loginHandler} changeHandler={changeHandler} errors={errors}/>
                            </Route>
                            <Route path="/registration">
                                <RegisterForm registerHandler={registerHandler} changeHandler={changeHandler} errors={errors}/>
                            </Route>
                        </div>
                    </div>
                </React.Fragment>
            </Switch>
        </BrowserRouter>
    )
}

export default AuthPage