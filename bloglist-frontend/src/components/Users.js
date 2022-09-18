import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Users = ()=>{
    const users = useSelector(state=>state.users)
    console.log(users)
    if (!users){
        return null
    }
    return(
        <div>
        <h2>Users</h2>
        <table>
          <tbody>
            <tr>
              <td></td>
              <td>
                <strong>blogs created</strong>
              </td>
            </tr>
            {users.map((u) => (
              <tr key={u.username}>
                <td>
                  <Link to={`/users/${u.id}`}>{u.username}</Link>
                </td>
                <td>{u.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}

export default Users