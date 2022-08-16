import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Details = () => {
    const [loading, setLoading] = useState(true);
    const [getuserdata, setUserdata] = useState([]);
    // console.log(getuserdata);

    const { id } = useParams("");
    // console.log(id);

    const history = useHistory();

    const getdata = async () => {
        setLoading(true);
        const res = await fetch(`https://mern-crud-webapp.herokuapp.com/getuser/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        // console.log(data);

        setLoading(false);
        if (res.status === 422 || !data) {
            // console.log("error");
            toast.error("Error in fetching data! 😢");
        } else {
            setUserdata(data);
            // console.log("get data");
        }
    };

    useEffect(() => {
        getdata();
    }, []);

    const deleteuser = async (id) => {
        setLoading(true);
        const res2 = await fetch(`https://mern-crud-webapp.herokuapp.com/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const deletedata = await res2.json();
        // console.log(deletedata);

        setLoading(false);
        if (res2.status === 422 || !deletedata) {
            toast.error("Something went wrong! 😢");
            // console.log("error");
        } else {
            toast.success(
                `${deletedata.name.split(" ")[0]} : Deleted Successfully 😁`
            );
            // console.log("user deleted");
            history.push("/");
        }
    };

    return (
        <>
            {!loading ? (
                <div className="container container1 padd">
                    <span className="notfound">
                        <h1
                            style={{ fontWeight: 100, fontSize: "4rem" }}
                            className="mb-5"
                        >
                            Welcome&nbsp;
                            <span className="uniq">{getuserdata.name}</span>
                        </h1>
                        <div className="row row1">
                            <div className="left_view col-12">
                                <div className="row row1">
                                    <div className="col-6 plpl">
                                        <img
                                            src="/profile.png"
                                            style={{ width: "7.5rem" }}
                                            alt="profile"
                                        />
                                    </div>
                                    <div className="my-auto col-6 text-right">
                                        <NavLink
                                            to={`/edit/${getuserdata._id}`}
                                            style={{ "--i": "#0dcaf0" }}
                                        >
                                            <button className="view btn btn-primary mx-2">
                                                <CreateIcon />
                                            </button>
                                        </NavLink>
                                        <button
                                            className="view btn btn-danger"
                                            onClick={() =>
                                                deleteuser(getuserdata._id)
                                            }
                                            style={{ "--i": "#dc3545" }}
                                        >
                                            <DeleteOutlineIcon />
                                        </button>
                                        <button
                                            className="view btn btn-primary mx-2"
                                            style={{ "--i": "#ffc107" }}
                                            onClick={history.goBack}
                                        >
                                            <ArrowBackIosNewOutlinedIcon />
                                        </button>
                                    </div>
                                </div>

                                <h3 className="mt-5 dgird">
                                    <span className="minmin">
                                        Enrollent Number
                                    </span>
                                    <span>{getuserdata.erno}</span>
                                </h3>
                                <h3 className="mt-4 dgird">
                                    <span className="minmin">Name</span>
                                    <span>{getuserdata.name}</span>
                                </h3>
                                <h3 className="mt-4 dgird">
                                    <span className="minmin">Mobile</span>
                                    {/* <PhoneAndroidIcon /> */}
                                    <span>+91 {getuserdata.mobile}</span>
                                </h3>
                            </div>
                        </div>
                    </span>
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

export default Details;
