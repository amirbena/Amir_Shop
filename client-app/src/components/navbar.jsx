import React from 'react';
import { Link, NavLink } from "react-router-dom";
const NavBar = ({ user, links }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
                Amiros SHOPIFY
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {links.map(link => (
                        <li className="nav-item">
                            <NavLink className="nav-link" to={link.link}>
                                {link.title}
                            </NavLink>
                        </li>
                    ))}
                    {!user ? (
                        <React.Fragment>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">
                                    Login
                                  </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/register">
                                    Register
                                </NavLink>
                            </li>
                        </React.Fragment>)
                        :
                        (
                            <React.Fragment>
                                 <li className="nav-item">
                                    <NavLink className="nav-link" to="/order-history">
                                        Order History
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/profile">
                                        {user.name}
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/logout">
                                        Logout
                                </NavLink>
                                </li>
                            </React.Fragment>)
                    }
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;