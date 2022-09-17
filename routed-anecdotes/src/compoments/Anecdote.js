const Anecdote = ({anecdote})=>{
    return(
    <div>
      <h3>{anecdote.content}</h3>
      <h3>Author: {anecdote.author}</h3>
      <p>Votes {anecdote.votes}</p>
      <a href={`${anecdote.info}`}>{anecdote.info}</a>
      <hr/>
    </div>
    )
  }
export default Anecdote