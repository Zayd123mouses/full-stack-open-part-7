import { useSelector } from "react-redux"
import { Link} from "react-router-dom"
import { Navbar, Nav, Button } from 'react-bootstrap'
import userService from '../services/user'
const Menu = ({logout})=>{
    const padding = {
        padding: 5
      }
      const user = userService.getUserName()
    
    return(
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">home</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/create">New Blog</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {user
              ? <em style={padding}>{user} logged in <Button onClick={logout}>Logout</Button></em>
              : <Link style={padding} to="/login">login</Link>
            }
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    )
}

export default Menu