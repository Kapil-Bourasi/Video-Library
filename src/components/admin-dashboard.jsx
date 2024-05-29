import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate , Link } from "react-router-dom";



export function AdminDashboard() {
    const [cookie, setCookies, removeCookies] = useCookies('userName')
    const [videos, setVideos] = useState([{ VideoId: 0, Title: 0, Url: '', Description: '', Likes: 0, Dislikes: 0, Views: 0, Comments: '', CategoryId: 0 }])
    let navigate = useNavigate()

    function LoadVideos() {
        axios.get('http://127.0.0.1:4000/get-videos')
            .then(res => {
                setVideos(res.data)
            })
    }

    useEffect(() => {
        if (cookie['userName'] == undefined) {
            navigate('/adminlogin')
        } else {
            LoadVideos()
        }
    }, [])

    return (<>
        <div>
            <h3>Dashboard :-  {cookie['userName']}</h3>
            <div className="mb-4"></div>
            <Link to='/add-videos' className='btn btn-success'>Add New Videos</Link>
            <table className="table table-hover">
                <thead>
                    <tr className="text-center">
                        <th>Title</th>
                        <th>Preview</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        videos.map(video => 
                            <tr className="text-center fw-bold" key={video.VideoId}>
                                <td width='200' >{video.Title}</td>
                                <td><iframe title="mod" src={video.Url} width='300' height='150'></iframe></td>
                                <td>
                                    <Link to={`/edit-video/${video.VideoId}`} className='btn btn-warning bi bi-pen-fill me-4'></Link>
                                    <Link to={`/delete-video/${video.VideoId}`} className='btn btn-danger bi bi-trash-fill'></Link>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>

    </>)
}