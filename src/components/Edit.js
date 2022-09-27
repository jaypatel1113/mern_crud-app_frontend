import React, { useEffect, useState } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

const Edit = () => {
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    const [inpval, setINP] = useState({
        erno: "",
        name: "",
        mobile: "",
    });

    const setdata = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value,
            };
        });
    };

    const { id } = useParams("");
    // console.log(id);

    const getdata = async () => {
        setLoading(true);
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/getuser/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        // console.log(data);

        setLoading(false);
        if (res.status === 422 || !data) {
            // console.log("error ");
            toast.error("Error in fetching data! 😢");
        } else {
            setINP(data);
            // console.log("get data");
        }
    };

    useEffect(() => {
        getdata();
    }, []);

    const updateuser = async (e) => {
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
            const res2 = await fetch(`${process.env.REACT_APP_SERVER_URL}/updateuser/${id}`, {
                method: "PATCH",
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
            const data2 = await res2.json();
            // console.log(data2);

            if (res2.status === 422 || !data2) {
                toast.warning("Fill all data!");
            } else {
                history.push("/");
                toast.success(
                    `${data2.name.split(" ")[0]} : Updated Successfully 😉`
                );
            }
        }
    };

    return (
        <>
            {!loading ? (
                <div className="container container1">
                    <form className="mt-4 backrel">
                        <NavLink to={`/`} style={{ "--i": "#ffc107" }}>
                            <button
                                className="view back btn btn-primary mx-2"
                                onClick={history.goBack}
                            >
                                <ArrowBackIosNewOutlinedIcon />
                            </button>
                        </NavLink>
                        <div className="container cont2 p-5 d-flex justify-content-center align-item-center flex-column">
                            <div className="mb-3 col-12">
                                <label for="erno" className="form-label">
                                    Enrollment Number
                                </label>
                                <input
                                    type="number"
                                    value={inpval.erno}
                                    onChange={setdata}
                                    name="erno"
                                    className="form-control"
                                    id="erno"
                                    placeholder="Enter Enrollment Number"
                                />
                            </div>
                            <div className="mb-3 col-12">
                                <label for="name" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={inpval.name}
                                    onChange={setdata}
                                    name="name"
                                    className="form-control"
                                    id="name"
                                    placeholder="Enter your Name"
                                />
                            </div>
                            <div className="mb-3 col-12">
                                <label for="mobile" className="form-label">
                                    Mobile
                                </label>
                                <input
                                    type="number"
                                    value={inpval.mobile}
                                    onChange={setdata}
                                    name="mobile"
                                    className="form-control"
                                    id="mobile"
                                    placeholder="Enter Mobile Number"
                                />
                            </div>
                            <button
                                type="submit"
                                onClick={updateuser}
                                className="col-12 mt-5 sbtn specbtn"
                                style={{ "--i": "#fd7e14" }}
                            >
                                Submit
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

export default Edit;
