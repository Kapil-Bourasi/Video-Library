import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";



export function UserLogin() {

    const [users, setUsers] = useState([{ UserId: '', UserName: '', Password: '', Mobile: '', Email: '' }])
    const [cookies, setCookies, removeCookies] = useCookies('UserName')
    const [userError, setuserErrors] = useState('')
    let navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            UserId: '',
            Password: ''
        },
        onSubmit: (values) => {
            var user = users.find(item => item.UserId === values.UserId);
            if (user.Password === values.Password) {
                setCookies('userName', user.UserName)
                navigate('/userdashboard')
            } else {
                setuserErrors('Invalid Credentials')
            }
        }
    })

    useEffect(() => {
        axios.get(`http://127.0.0.1:4000/get-users`)
            .then(res => {
                setUsers(res.data)
            })
    }, [])

    return (
        <>
            <div className="d-flex justify-content-center align-items-center">
                <div className=" rounded-2 w-25 p-4 m-3" style={{backgroundColor:'rgb(31, 176, 176)',color:'white'}}>
                    <h3 className="text-center mb-3 fw-bold">User Login</h3>
                    <form onSubmit={formik.handleSubmit}>
                        <dl>
                            <dt className="m-2">User Id</dt>
                            <dd><input type="text" className="form-control text-black" name="UserId" onChange={formik.handleChange} /></dd>
                            <dt className="m-2">Password</dt>
                            <dd><input type="text" className="form-control text-black" name="Password" onChange={formik.handleChange} /></dd>
                        </dl>
                        <div className="d-flex justify-content-center">
                        <button className="btn btn-primary" type="submit">Login</button>
                        <Link to='/add-user' className='btn ms-2 btn-success'>New User</Link>
                        </div>
                        <p className="text-danger">{userError}</p>
                    </form>
                </div>
            </div>
        </>
    )

}