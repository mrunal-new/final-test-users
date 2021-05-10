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
      [name]: value,

    })
  }

  console.log(users);

  const handleUsers = () => {
    if (formData !== undefined) {
      let res = Object.getOwnPropertyNames(formData);
      if (res.length === 5 ) {
        if (users === undefined) {
          setUsers([{...formData, id: Math.random()}]);
        } else {
          setUsers([ ...users, {...formData, id: Math.random()} ]);
        }
      }
    }
  }

  const handleDeleteUsers = (data) => {
    setUsers((prevState) => {
      const fil = prevState.filter((value) => {
        return value.id !== data ;
      });
      return fil;
    })

  }

  const handleEditUsers = (data) => {
    setUsers((prevState) => {
      let res = prevState.filter((val) => {
        return val.id === data;
      })
      let res2 = prevState.filter((val) => {
        return val.id !== data;
      })

      return [ ...res2, { ...res[0], edit: true } ]
    })
  }

  const handleInsaneEdit = (id) => {
    setUsers((prevState) => {
      let res = prevState.filter((val) => {
        return val.id === id;
      })
      let res2 = prevState.filter((val) => {
        return val.id !== id;
      })

      return [ ...res2, { ...formData } ]
    });
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
          <tr>
            <td>Loki</td>
            <td>M</td>
            <td>294783</td>
            <td>BE</td>
            <td>loki@gmail.com</td>
          </tr>
          {users?.map((value) => (
            (!value.hasOwnProperty('edit')) ? (
            <tr >
            <td>{value.name}</td>
            <td>{value.gender}</td>
            <td>{value.phone}</td>
            <td>{value.qualification}</td>
            <td>{value.email}</td>
            <td><Button variant="danger" onClick={() => handleDeleteUsers(value.id)}>Delete</Button></td>
            <td ><Button variant="light" onClick={() => handleEditUsers(value.id)}>Edit</Button></td>
            </tr>
            ) : (
            <tr>
            <td><input type="text" defaultValue={value.name} name='name' placeholder="name" onChange={handleForm} /></td>
            <td><input type="text" defaultValue={value.gender} name='gender' placeholder="gender" onChange={handleForm}/></td>
            <td><input type="number" defaultValue={value.phone} name='phone' placeholder="phone" onChange={handleForm}/></td>
            <td><input type="text" defaultValue={value.qualification} name='qualification' placeholder="qualification" onChange={handleForm}/></td>
            <td><input type="email" defaultValue={value.email} name='email' placeholder="Email" onChange={handleForm}/></td>
            <td><Button variant="success" onClick={() => handleInsaneEdit(value.id)}>Done</Button></td>
            </tr>
            )
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
