import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from './store'
import { Provider } from 'react-redux'
import {
    BrowserRouter as Router,
    Routes, Route, Link
  } from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
      
        <Provider store={store}> <App /> </Provider>
     
    </Router>

   
)