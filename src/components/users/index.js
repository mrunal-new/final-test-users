import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';

const Users = () => {
  const [users, setUsers] = useState(undefined);
  const [formData, setFormData] = useState(undefined);

  const handleForm = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleUsers = () => {
    if (formData !== undefined) {
      let res = Object.getOwnPropertyNames(formData);
      if (res.length === 5 ) {
        if (users === undefined) {
          setUsers([ formData ]);
        } else {
          setUsers([ ...users, formData ]);
        }
      }
    }
  }

  const handleDeleteUsers = (data) => {
    setUsers((prevState) => {
      const fil = prevState.filter((value) => {
        return value.name !== data ;
      });
      return fil;
    })

  }

  return (
    <div style={{ marginTop: '50px' }}>
      <h1>Users</h1>
      <Table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Gender</th>
          <th>Phone Number</th>
          <th>Qualification</th>
          <th>Email</th>
        </tr>
        </thead>
        <tbody>
          {users?.map((value) => (
            <tr >
            <td>{value.name}</td>
            <td>{value.gender}</td>
            <td>{value.phone}</td>
            <td>{value.qualification}</td>
            <td>{value.email}</td>
            <td><Button variant="danger" onClick={() => handleDeleteUsers(value.name)}>Delete</Button></td>
            <td><Button variant="black" onClick={() => handleDeleteUsers(value.name)}>Edit</Button></td>
          </tr>
          ))}
        </tbody>
        <span>Add user below</span>
        <tbody>
          <tr>
            <td><input type="text" name='name' placeholder="name" onChange={handleForm} /></td>
            <td><input type="text" name='gender' placeholder="gender" onChange={handleForm}/></td>
            <td><input type="number" name='phone' placeholder="phone" onChange={handleForm}/></td>
            <td><input type="text" name='qualification' placeholder="qualification" onChange={handleForm}/></td>
            <td><input type="email" name='email' placeholder="Email" onChange={handleForm}/></td>
          </tr>
          <Button onClick={handleUsers}>Add</Button>
        </tbody>
      </Table>
    </div>
  )
}

export default Users;
