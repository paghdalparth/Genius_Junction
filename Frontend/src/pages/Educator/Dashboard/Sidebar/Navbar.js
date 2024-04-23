import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
// import { SidebarData } from "../../../../data/Edusidebar";
import logo from "./../../../../data/imgs/Logo.png"
import {SidebarData} from "./Navbar_data";
const EdNavbar = (props) => {
    const location = useLocation();

    const [selected, setSelected] = useState(0);

    return (
        <nav id="menu" className="navbar navbar-default navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                    <button
                        type="button"
                        className="navbar-toggle collapsed"
                        data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-1"
                    >
                        {" "}
                        <span className="sr-only">Toggle navigation</span>{" "}
                        <span className="icon-bar"></span>{" "}
                        <span className="icon-bar"></span>{" "}
                        <span className="icon-bar"></span>{" "}
                    </button>
                    <NavLink className="navbar-brand page-scroll" to="#page-top">
                        {/* change the color of logo */}
                        <img src={logo} alt="" height={40} /> 
                    </NavLink>{" "}
                </div>

                <div
                    className="collapse navbar-collapse"
                    id="bs-example-navbar-collapse-1"
                >
                    <ul className="nav navbar-nav navbar-right">

                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index}>
                                    <NavLink to={item.route} className='page-scroll'
                                    style={location.pathname === item.route ? {color: "0C356a"} : {}}>
                                            {item.heading}
                                    </NavLink>
                                </li>

                            );
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default EdNavbar
