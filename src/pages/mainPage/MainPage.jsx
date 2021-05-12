import React, {useState, useContext, useCallback, useEffect} from 'react'
import axios from "axios";
import './../../scss/style.scss'
import {AuthContext} from "../../context/AuthContext";

const MainPage = () => {
    const [text, setText] = useState('')
    const {userId} = useContext(AuthContext)
    const [todos, setTodos] = useState([])

    const getTodo = useCallback(async () => {
        try {
            await axios.get('https://autorisation-form.herokuapp.com/api/todo', {
                headers: {
                    'ContentType': 'application/json'
                },
                params: {userId}
            })
                .then(res => setTodos(res.data))

        } catch (e) {
            console.log(e)
        }
    }, [userId])

    const createTodo = useCallback(async () => {
        try {
            await axios.post('https://autorisation-form.herokuapp.com/api/todo/add', {text, userId},
                {
                    headers: {'ContentType': 'application/json'}
                })
                .then(res => {
                    setTodos([...todos], res.data)
                    setText('')
                    getTodo()
                })
        } catch (e) {
            console.log(e)
        }
    }, [text, userId, todos, getTodo])

    const removeTodo = useCallback(async (id) => {
        try {
            await axios.delete(`https://autorisation-form.herokuapp.com/api/todo/delete/${id}`, {id},
                {
                    headers: {'ContentType': 'application/json'}
                })
                .then(() => getTodo())
        } catch (e) {
            console.log(e)
        }
    }, [getTodo])

    const completedTodoHandler = useCallback(async (id) => {
        try {
            await axios.put(`https://autorisation-form.herokuapp.com/api/todo/completed/${id}`, {id},
                {
                    headers: {'ContentType': 'application/json'}
                })
                .then(res => {
                    setTodos([...todos], res.data)
                    getTodo()
                })
        } catch (e) {

        }
    }, [getTodo, todos])

    const importantTodoHandler = useCallback(async (id) => {
        try {
            await axios.put(`https://autorisation-form.herokuapp.com/api/todo/important/${id}`, {id},
                {
                    headers: {'ContentType': 'application/json'}
                })
                .then(res => {
                    setTodos([...todos], res.data)
                    getTodo()
                })
        } catch (e) {

        }
    }, [getTodo, todos])

    useEffect(() => {
        getTodo()
    }, [getTodo])

    return (
        <div className="container">
            <div className="main-page">
                <h4>Add task</h4>
                <form className="form, form-login" onSubmit={e => e.preventDefault()}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input type="text" id="text" name="input" value={text} className="validate"
                                   onChange={e => setText(e.target.value)}/>
                            <label htmlFor="input">Task</label>
                        </div>
                    </div>
                    <div className="row">
                        <button className="waves-effect  waves-light btn blue" onClick={createTodo}>Add</button>
                    </div>
                </form>
                <h3>Active tasks: </h3>
                <div className="todos">
                    {todos.map((todo, index) => {
                        let cls = ['row flex todos-item']
                        if(todo.completed){
                            cls.push('completed')
                        }
                        if(todo.important){
                            cls.push('important')
                        }
                        return (
                            <div className={cls.join(' ')} key={index}>
                                <div className="col todos-num">{index}</div>
                                <div className="col todos-text">{todo.text}</div>
                                <div className="col todos-buttons">
                                    <i className="material-icons blue-text" onClick={() => completedTodoHandler(todo._id)}>check</i>
                                    <i className="material-icons orange-text" onClick={() => importantTodoHandler(todo._id)}>warning</i>
                                    <i className="material-icons red-text" onClick={() => removeTodo(todo._id)}>delete</i>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default MainPage