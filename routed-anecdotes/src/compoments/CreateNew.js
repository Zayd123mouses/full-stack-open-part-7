import {useField} from '../hooks/index' 
import { Form, Button } from 'react-bootstrap'

const CreateNew = (props) => {
  const padding = {
    paddingRight: 5
  }
    const {reset: resetContent, ...content} = useField("content")
    const {reset: resetAuthor, ...author}  = useField("author")
    const {reset: resetInfo, ...info}  = useField("info")
  
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
    }
    const handleReset = ()=>{
        resetAuthor()
        resetContent()
        resetInfo()
    } 
   
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <Form onSubmit={handleSubmit}>
          <div>
          <Form.Label> Content</Form.Label>
            
            <Form.Control {...content} />
          </div>
          <div>
          <Form.Label>Author</Form.Label>
            <Form.Control {...author}/>
          </div>
          <div>
          <Form.Label>Url</Form.Label>
            <Form.Control  {...info}/>
          </div>
          <br/>
          <div style={padding}>
          <Button  variant="primary" type='submit' >create  </Button>
          &ensp;
          <Button  variant="primary" type="button" onClick={()=>handleReset()}>Reset</Button>
          </div>
        </Form>
     </div>
    )
  
  }
export default CreateNew