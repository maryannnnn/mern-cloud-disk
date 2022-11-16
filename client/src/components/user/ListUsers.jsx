import React, { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux'
import './user.css'
import { actionListUsers } from '../../actions/userActions'
import { MessageBox, LoadingBox } from '../../utils/boxes/boxes'

const ListUsers = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch( actionListUsers() ) 
  }, [])

  const authLoginR = useSelector((state) => state.authLoginR)
  const { isAuth } = authLoginR

  const userListR = useSelector((state) => state.userListR)
  const { loading, error, users } = userListR
  console.log("users userListR", { users })
  
  return (
    <div className="table">
      <h1>All users</h1>
   
      {loading ? (<LoadingBox></LoadingBox>) :
        error ? (<MessageBox>{error}</MessageBox>) :
          (
            <table>
              <thead>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </thead>
              <tbody>
                { users ? 
                  users.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                    </tr>
                  )) : console.log("users Not")
                }
              </tbody>
            </table>
          )
      }
      
    </div>
  )
}

export default ListUsers