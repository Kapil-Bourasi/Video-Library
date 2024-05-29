import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


export function DeleteVideo(){

    const [videos, setVideos] = useState([{VideoId:0, Title:'', Url:'', Likes:0, Dislikes:0, Views:0, Comments:'', CategoryId:0}])
    let navigate = useNavigate()
    let params = useParams()

    useEffect(()=>{
        axios.get(`http://127.0.0.1:4000/video/${params.id}`)
        .then(res=>{
            setVideos(res.data)
        })
    },[])

    function handleDeleteClick(){
        axios.delete(`http://127.0.0.1:4000/delete-video/${params.id}`)
        alert("Video Deleted")
        navigate("/admindashboard")
    }

   return(
    <div className="d-flex justify-content-center">
        <div>
        <h3>Delete Video</h3>
        <div>
            <h3 className="text-center mt-4"> Title :- {videos[0].Title}</h3>
            <iframe src={videos[0].Url} title="fad" width="400" height="300" />
        </div>
        <div className="mt-3 justify-content-center d-flex">
            <button onClick={handleDeleteClick}  className="btn btn-danger me-2">Delete</button>
            <Link to="/admindashboard"><span className="btn btn-warning">Cancel</span></Link>
        </div>
        </div>
    </div>
   )
}