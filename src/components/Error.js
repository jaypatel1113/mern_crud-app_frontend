import React from "react";
import { NavLink } from "react-router-dom";

const Error = () => {
    return (
        <>
            <div className="container">
                <div
                    style={{
                        minHeight: "calc(100vh - 8rem - 1.5rem)",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <img
                        src="/404.svg"
                        alt="error"
                        style={{ width: "50rem", marginBottom: "2rem" }}
                    />
                    {/* <h1 className="mb-3">404 ERROR </h1> */}
                    <h2 className="mb-3" style={{fontSize: "3.4rem"}}>PAGE NOT FOUND</h2>
                    <NavLink
                        to="/"
                        className="sbtn"
                        style={{
                            "--i": "#4cd964",
                            zIndex: 1000,
                            marginTop: "1rem",
                            borderRadius: "1rem",
                            background: "rgba(255,255,255,0.25)",
                            padding: "1rem 2rem",
                            color: "#fff",
                            textDecoration: "none",
                            fontSize: "1.8rem",
                        }}
                    >
                        Back To Home Page
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default Error;
