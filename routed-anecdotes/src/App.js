import { useState } from 'react'
import {
  Routes, Route,
  useMatch,   useNavigate
} from "react-router-dom"

import Menu from './compoments/Menu'
import AnecdoteList from './compoments/AnecdoteList'
import About from './compoments/About'
import Footer from './compoments/Footer'
import CreateNew from './compoments/CreateNew' 
import Anecdote from './compoments/Anecdote'
import Notification from './compoments/Notification'


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  const [notification, setNotification] = useState('')
  const navigate = useNavigate()



  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    navigate('/')
    setNotification(`A new anecdote has been added "${anecdote.content} " `)
    setTimeout(()=>{
      setNotification(null)
    }, 5000)
  }

  
  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }



  const match = useMatch('/anecdotes/:id')
  const anecdote = match 
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  return (
     <div className="container">
      <h1>Software anecdotes</h1>
     <Menu />
      <Notification notification={notification}/>
      <Routes>
         <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
         <Route path="/about" element={<About />} />
         <Route path="/create" element={<CreateNew addNew={addNew} />} />
         <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
      </Routes>
     
      <Footer />
      </div>
  )
}

export default App
