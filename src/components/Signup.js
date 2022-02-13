import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

const Signup = () => {
  const context = useContext(noteContext);
    const { posttodolist , addNote } = context;
  
  const [userdata, setuserdata] = useState({ name: "", email: "", password: "" });
  const [error, seterror] = useState({ error: "" });
  let history = useHistory();

  const handelSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: userdata.name, email: userdata.email, password: userdata.password })
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      history.push("/");
      posttodolist(["hack nasa using html" , "hack google using css"]);
      addNote("Note title" , "This is the example of a note you can also delete and edit this note your note is save in database" , "Show note");
    }
    else {
      return seterror({ error: json.error[0].msg });
    }
  }
  const onchange = (e) => {
    setuserdata({...userdata, [e.target.name]: e.target.value });
    seterror({error:""});
  }

  return (
    <div className="container">
      <div className="wrapper">
        <div className="logo"> <img src="/43171013.jpg" alt="loading img..." />
        </div>
        <div className="text-center mt-4">Create an Account to use</div>
        <div className="text-center mt-1 name">iNotebook</div>
        <form className="p-3 mt-3" onSubmit={handelSubmit} >
          <div className="form-field d-flex align-items-center"> <input type="text"
            name="name" id="name" onChange={onchange} value={userdata.name} placeholder="Name" required /> </div>
          <div className="form-field d-flex align-items-center"> <input type="email"
            name="email" id="email" onChange={onchange} placeholder="Email" value={userdata.email} required /> </div>
          <div className="form-field d-flex align-items-center"> <input type="password"
            name="password" id="password" onChange={onchange} value={userdata.password} placeholder="Password" minLength="5" required /> </div>
          <div className="error">{error.error}</div>
          <button type="submit" className="btn mt-3">Sing up</button>
        </form>
        <div className="text-center fs-6"> <a href="/">Forget password?</a> or <a href="/login">Log in</a> </div>
      </div>
    </div>
  )
}

export default Signup;
