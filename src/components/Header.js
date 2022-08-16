import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import Particles from "./Particles";

import "./header.css";

const Header = () => {
    const [tog, setTog] = useState(false);

    return (
        <>
            <Particles id="tsparticles" tog={tog} />
            <header>
                <nav>
                    <NavLink to="/" style={{ zIndex: 1000 }}>
                        <h1>JP MERN</h1>
                    </NavLink>
                    <span
                        onClick={() => setTog(!tog)}
                        style={{ zIndex: 1000, cursor: "pointer" }}
                        className={`${tog ? "active" : ""}`}
                    ></span>
                    <NavLink to="/register" style={{ zIndex: 1000 }}>
                        <button
                            className="specbtn"
                            style={{ "--i": "#d63384" }}
                        >
                            ADD USER
                        </button>
                    </NavLink>
                </nav>
            </header>
        </>
    );
};

export default Header;
