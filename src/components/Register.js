import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

const Register = () => {
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const [inpval, setINP] = useState({
        erno: "",
        name: "",
        mobile: "",
    });

    const setdata = (e) => {
        // console.log(e.target.value, e.target.name);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value,
            };
        });
    };

    const addinpdata = async (e) => {
        e.preventDefault();

        const { erno, name, mobile } = inpval;

        if (erno === "") {
            toast.warn("Enter the Enrollment Number");
        } else if (name === "") {
            toast.warn("Enter the name");
        } else if (mobile === "") {
            toast.warn("Enter the Mobile Number");
        } else {
            setLoading(true);
            const res = await fetch("https://mern-crud-webapp.herokuapp.com/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    erno,
                    name,
                    mobile,
                }),
            });

            setLoading(false);
            const data = await res.json();
            // console.log(data);

            if (res.status === 422 || !data) {
                toast.error("Something went wrong! 😢");
                // console.log("error ");
            } else if (res.status === 409) {
                toast.warn("Enrollment Number already exits! 😢");
            } else {
                history.push("/");
                toast.success(
                    `${data.name.split(" ")[0]} : Added Successfully 😉`
                );
                // console.log("data added");
            }
        }
    };

    return (
        <>
            {!loading ? (
                <div className="container container1">
                    <form className="mt-4 backrel">
                        <NavLink to={`/`} style={{ "--i": "#ffc107" }}>
                            <button className="view back btn btn-primary mx-2">
                                <ArrowBackIosNewOutlinedIcon />
                            </button>
                        </NavLink>
                        <div className="container cont2 p-5 d-flex justify-content-center align-item-center flex-column">
                            <div class="mb-3 col-12">
                                <label for="erno" class="form-label">
                                    Enrollment Number
                                </label>
                                <input
                                    type="number"
                                    value={inpval.erno}
                                    onChange={setdata}
                                    name="erno"
                                    class="form-control"
                                    id="erno"
                                    placeholder="Enter Enrollment Number"
                                />
                            </div>
                            <div class="mb-3 col-12">
                                <label for="name" class="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={inpval.name}
                                    onChange={setdata}
                                    name="name"
                                    class="form-control"
                                    id="name"
                                    placeholder="Enter your Name"
                                />
                            </div>
                            <div class="mb-3 col-12">
                                <label for="mobile" class="form-label">
                                    Mobile
                                </label>
                                <input
                                    type="number"
                                    value={inpval.mobile}
                                    onChange={setdata}
                                    name="mobile"
                                    class="form-control"
                                    id="mobile"
                                    placeholder="Enter Mobile Number"
                                />
                            </div>
                            <button
                                type="submit"
                                onClick={addinpdata}
                                class="col-12 specbtn sbtn mt-5"
                                style={{ "--i": "#fd7e14" }}
                            >
                                SUBMIT
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "calc(100vh - 12rem)",
                        fontSize: "2rem",
                    }}
                >
                    Loading... &nbsp;
                    <CircularProgress />
                </Box>
            )}
        </>
    );
};
export default Register;
