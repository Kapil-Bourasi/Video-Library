import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";




export function UserRegister(){

    let navigate = useNavigate()

    const formik = useFormik({
        initialValues:{
            UserId:'',
            Password:'',
            UserName:'',
            Mobile:'',
            Email:''
        },
        onSubmit:(values)=>{
            axios.post(`http://127.0.0.1:4000/add-user`, values)
            alert('User Register Successfully..')
            navigate('/userlogin')
        }
    })

    return(
        <div className="d-flex justify-content-center align-items-center" >
            <div className="rounded-2 w-25" style={{backgroundColor:'rgb(31, 176, 176)',color:'white'}}>
                <h4 className="text-center fw-bold p-2">Register User</h4>
                <form onSubmit={formik.handleSubmit} action="post">
                    <dl>
                        <dt className="small ms-2 text-center">User Id</dt>
                        <dd ></dd><input type="text" className="form-control w-75 ms-4 text-black" name="UserId" onChange={formik.handleChange} />
                        <dt className="small ms-2 text-center mt-2">User Name</dt>
                        <dd ></dd><input type="text" className="form-control w-75 ms-4 text-black"  name="UserName" onChange={formik.handleChange} />
                        <dt className="small ms-2 text-center mt-2">Password</dt>
                        <dd ></dd><input type="password" className="form-control w-75 ms-4 text-black"  name="Password" onChange={formik.handleChange} />
                        <dt className="small ms-2 text-center mt-2">Mobile Number</dt>
                        <dd ></dd><input type="number" className="form-control w-75 ms-4 text-black" name="Mobile" onChange={formik.handleChange} />
                        <dt className="small ms-2 text-center mt-2">Email id</dt>
                        <dd ></dd><input type="email" className="form-control w-75 ms-4 text-black" name="Email" onChange={formik.handleChange} />
                    </dl>
                   <div className="d-flex justify-content-center ">
                   <button type="submit" className="btn btn-primary m-2">Register</button>
                   </div>
                </form>
            </div>
        </div>
    )

}