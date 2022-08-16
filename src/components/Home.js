import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Home = () => {

    const [getuserdata, setUserdata] = useState([]);
    const [loading, setLoading] = useState(true);
    // console.log(getuserdata);

    const getdata = async () => {

        setLoading(true);
        
        const res = await fetch("https://mern-crud-webapp.herokuapp.com/getdata", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        const data = await res.json();
        // console.log(data);
        
        setLoading(false);
        if (res.status === 422 || !data) {
            // console.log("error ");
            toast.error("Error in fetching data! 😢");
            
        } else {
            setUserdata(data)
            // console.log("get data");
        }
    }

    useEffect(() => {
        setLoading(true);
        getdata();
    }, [])

    const deleteuser = async (id) => {

        const res2 = await fetch(`https://mern-crud-webapp.herokuapp.com/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        // console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            // console.log("error");
            toast.error("Something went wrong! 😢");
        } else {
            toast.success(`${deletedata.name.split(" ")[0]} : Deleted Successfully 😁`);
            // console.log("user deleted");
            getdata();
        }

    }


    return (

        <>
            {
                !loading ? getuserdata.length === 0 ? (
                    <div className="container container1">
                        <span className="notfound">Data  Not found</span>
                    </div>
                ) : (
                    <div className="mt-5">
                    <div className="container">
                        <table class="table">
                            <thead>
                                <tr className="">
                                    <th scope="col">Enrollment Number</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Mobile Number</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    getuserdata.map((element, id) => {
                                        return (
                                            <>
                                                <tr className='eachItem'>
                                                    {/* <th scope="row">{id + 1}</th> */}
                                                    <td>{element.erno}</td>
                                                    <td>{element.name}</td>
                                                    <td>{element.mobile}</td>
                                                    <td>
                                                        <NavLink to={`view/${element._id}`}> <button className="btn btn-success" style={{"--i": "#20c997"}}><RemoveRedEyeIcon /></button></NavLink>
                                                        <NavLink to={`edit/${element._id}`}>  <button className="btn btn-primary" style={{"--i": "#0dcaf0"}}><CreateIcon /></button></NavLink>
                                                        <button className="del btn btn-danger" onClick={() => deleteuser(element._id)} style={{"--i": "#dc3545"}}><DeleteOutlineIcon /></button>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
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
    )
}

export default Home

















