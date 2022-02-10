import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
    const [userdata , setuserdata] = useState({email : "" , password : ""})
    const [error , seterror] = useState({error:""});
    let history = useHistory();
    const handelSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:userdata.email , password:userdata.password})
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token' , json.authtoken)
            history.push("/");
        }
        else{
         return seterror({error:json.error});
        }
    }
    const handelclick = (e) => {
        setuserdata({...userdata , [e.target.name]:e.target.value});
        seterror({error:""});
    }

    return (
        <div className="container">
            <div className="wrapper">
        <div className="logo"> <img src="/43171013.jpg" alt="loading img..."/>
        </div>
        <div className="text-center mt-4 name">iNotebook</div>
        <form className="p-3 mt-3" onSubmit={handelSubmit}>
            <div className="form-field d-flex align-items-center"> <input type="email"
                    name="email" onChange={handelclick} id="email" value={userdata.email} placeholder="Email" required/> </div>
            <div className="form-field d-flex align-items-center"> <input type="password"
                    name="password" id="password" onChange={handelclick} value={userdata.password} placeholder="Password" minLength="5" required/> </div>
            <div className="error">{error.error}</div>
            <button type="submit" className="btn mt-3">Login</button>
        </form>
        <div className="text-center fs-6"> <a href="/">Forget password?</a> or <a href="/singup">Sign up</a> </div>
    </div>
        </div>
    )
}

export default Login;
