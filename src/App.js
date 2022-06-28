import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [users, setUser] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  function saveData() {
    let item = { name, email, mobile };
    console.log(item);
    fetch("https://crudcrud.com/api/59d8c1b5a6f64d01b30eee37c4730858/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((resp) => {
      resp.json().then((result) => {
        console.warn("result", result);
      });
    });
  }

  function getUsers() {
    fetch(
      "https://crudcrud.com/api/59d8c1b5a6f64d01b30eee37c4730858/users"
    ).then((result) => {
      result.json().then((resp) => {
        setUser(resp);
        setName(resp[0].name);
        setMobile(resp[0].mobile);
        setEmail(resp[0].email);
        setUserId(resp[0].id);
      });
    });
  }

  function deleteUser(id) {
    fetch(
      `https://crudcrud.com/api/59d8c1b5a6f64d01b30eee37c4730858/users/${id}`,
      {
        method: "DELETE",
      }
    ).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        getUsers();
      });
    });
  }
  // function selectUser(id) {
  //   let item = users[id - 1];
  //   setName(item.name);
  //   setEmail(item.email);
  //   setMobile(item.mobile);
  //   setUserId(item.id);
  // }
  function updateUser() {
    let item = { name, mobile, email };
    console.warn("item", item);
    fetch(
      `https://crudcrud.com/api/59d8c1b5a6f64d01b30eee37c4730858/users/${userId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }
    ).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        getUsers();
      });
    });
  }
  return (
    <form className="user">
    <div className="main">
      <div className="App">
        <h1 className="header">Students Data</h1>
        <div className="card">
          <label for="name">Name : </label><br/> 
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          <label for="email">Email : </label><br/> 
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <label for="ph no">Phone No : </label><br/> 
          <input
            type="text"
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value);
            }}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <br />
          <button className="btn" onClick={saveData}>Post Data</button>
          <br />
        </div>
        <br />
        <div className="card2">
        <table 
          border="1"
          style={{ float: "center" }}
          className="students"
        >
          <tbody>
            <tr className="head">
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Operations</th>
            </tr>
            {users.map((item, i) => (
              <tr key={i}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.mobile}</td>
                <td>
                  <button onClick={() => deleteUser(item._id)}>Delete</button>
            
                  <button onClick={() => updateUser(item._id)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
    </form>
  );
}
export default App;
