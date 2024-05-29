import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";


function RegisterLink() {
    return (
        <div>
            <Link to="/add-user" className="btn btn-light mt-4">Account not found</Link>
        </div>
    )
}

export function MainVideo() {
    let navigate = useNavigate()
    const [userEmail, setUserEmail] = useState('')
    const [users, setUsers] = useState([{ UserId: '', UserName: '', Password: '', Mobile: '', Email: '' }])
    const [userError, setUserError] = useState('')

    useEffect(() => {
        axios.get(`http://127.0.0.1:4000/get-users`)
            .then(res => {
                setUsers(res.data)
            })
    }, [])

    function handleEmailChange(e) {
        setUserEmail(e.target.value)
    }

    function handleGateStarted() {
        var user = users.find(item => item.Email === userEmail)
        if (user == undefined) {
            setUserError(<RegisterLink />)
        } else {
            navigate('/userlogin')
        }
    }

    return (
        <>
            <div>
                <main className="d-flex justify-content-center mt-4" >
                    <div>
                    <h1>Watch Videos Any Where </h1>
                    <p className="text-center mt-4 mb-4">Please Register For More Videos</p>
                    <div className="input-group">
                    <input type="email" onChange={handleEmailChange} className="form-control" placeholder="Your Email Address" />
                    <button onClick={handleGateStarted} className="btn btn-danger" color="error">Get Started</button>
                    </div>
                    </div>
                </main>
                
            </div>
        </>
    )
}