import axios from "axios";
import { Formik, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";



export function AdminLogin(){
    const [users, setUsers]=useState([{UserId:'',UserName:'',Password:'',Email:'',Mobile:''}])
    const [cookie,setCookies,removeCookies] = useCookies('userName')
    const [userError,setUserError]= useState('')
    let navigate = useNavigate()

    useEffect(()=>{
        axios.get(`http://127.0.0.1:4000/get-admin`)
        .then(res=>{
            setUsers(res.data)
        })
    },[])

    const formik = useFormik({
        initialValues:{
            UserId:'',
            Password:''
        },
        onSubmit:(values)=>{
            var user = users.find(item=>item.UserId===values.UserId)
            if(user.Password===values.Password){
                setCookies('userName',user.UserId)
                navigate('/admindashboard')
            }else{
                setUserError('Invalid Credential')
                
            }
        }
    })

    return(
        <>
        <div className="d-flex justify-content-center align-items-center">
            <div className="p-2 rounded-2 w-25" style={{backgroundColor:'rgb(31, 176, 176)',color:'white'}}>
                <h2 className="text-center mb-4">Admin Login</h2>
                <form action="get" onSubmit={formik.handleSubmit}>
                    <dl className="me-4 ms-4">
                        <dt className="mt-2" >User Id</dt>
                        <dd><input className="form-control mt-2 text-black" name="UserId" type="text" onChange={formik.handleChange} /></dd>
                        <dt className="mt-2" >Password</dt>
                        <dd><input className="form-control mt-2 text-black" name="Password" type="text" onChange={formik.handleChange} /></dd>
                    </dl>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                    <p className="text-warning fw-bold mt-2">{userError}</p>
                </form>
            </div>
        </div>
        </>
    )
}