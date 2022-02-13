import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Navbar = () => {
    let history = useHistory();
    let location = useLocation();
    useEffect(() => { }, [location]);
    const logoutclick = () => {
        localStorage.removeItem('token');
        history.push('./login');
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">iNotebook</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Note</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/todo"> Todolist </Link>
                            </li>
                        </ul>
                        {localStorage.getItem('token') ? <Link className="btn btn-outline-light btn-sm mx-1" onClick={logoutclick} role="button">Log out</Link> :
                            <form className="d-flex">
                                <Link className="btn btn-outline-light btn-sm mx-1" to="/login" role="button">Log in</Link>
                                <Link className="btn btn-outline-light btn-sm mx-2" to="/singup" role="button">Sign up</Link>
                            </form>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;
