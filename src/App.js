import React from "react";
import './scss/style.scss'
import Navbar from "./components/NavBar/Navbar";
import {BrowserRouter} from 'react-router-dom'
import useRoutes from './routes'
import {AuthContext} from './context/AuthContext'
import useAuth from './hooks/auth.hook'

function App() {
    const {login, logout, token, isReady, userId} = useAuth()
    const isLogin = !!token
    const routes = useRoutes(isLogin)

  return (
      <AuthContext.Provider value={{login, logout, token, isReady, userId, isLogin}}>
          <div className="app">
              <BrowserRouter>
                  <Navbar />
                  {routes}
              </BrowserRouter>
          </div>
      </AuthContext.Provider>

  );
}

export default App;
