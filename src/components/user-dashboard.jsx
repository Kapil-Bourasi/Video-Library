import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToLibrary } from "../slicer/like-slicer";
import store from "../store/store";



export function UserDashboard() {
    const [cookie, setCookies, removeCookies] = useCookies()
    const [videos, setVideos] = useState([{ VideoId: 0, Title: '', Url: '', Likes: 0, Dislikes: 0, Views: 0, Comments: '', CategoryId: 0 }])
    let navigate = useNavigate()

    const dispatch = useDispatch();
    const select = useSelector((State) => State.store.videoCount)

    const dispatchlike = useDispatch();

    function LoadVideos() {
        axios.get('http://127.0.0.1:4000/get-videos')
            .then(res => {
                setVideos(res.data)
            })
    }

    useEffect(() => {
        if (cookie['userName'] == undefined) {
            navigate('/userlogin')
        } else {
            LoadVideos();
        }
    }, [select])

    function handleSaveClick(video) {
        alert('video saved')
        dispatch(addToLibrary(video))
    }

    return (<>

        <h3>{cookie["userName"]} - Dashboard - <button data-bs-target="#Library" data-bs-toggle="modal" className="btn btn-warning position-relative bi bi-camera-video"><span className="badge bg-danger rounded rounded-circle position-absolute">{select}</span></button> </h3>
        <div className="modal fade modal-dismissible" id="Library">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="text-primary ms-2">Your Saved Videos</h4>
                        <button className="btn btn-close btn-danger" data-bs-dismiss='modal'></button>
                    </div>
                    <div className="modal-body">
                        {store.getState().store.MyVideoLibrary.map(video =>
                            <iframe className="m-3" src={video.Url} width='200' height='200'></iframe>)}
                    </div>
                </div>
            </div>
        </div>
        <section className="d-flex flex-wrap">
            {
                videos.map(video =>
                    <div key={video.VideoId} className="card p-2 m-2" style={{ width: "380px" }}>
                        <div className="card-header" style={{ height: "80px" }}>
                            <h3>{video.Title}</h3>
                        </div>
                        <div className="card-body">
                            <iframe src={video.Url} width="100%" height="200px" />
                        </div>
                        <div className="card-footer">
                            <button onClick={() => handleSaveClick(video)} className="btn btn-success">Save</button>
                            <div>
                                <label className="form-label">Commets :- </label>
                                <div>{video.Comments}</div>
                            </div>
                        </div>
                    </div>
                )
            }
        </section>
    </>)

}