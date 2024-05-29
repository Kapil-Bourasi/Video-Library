import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


export function EditVideo() {

    const [videos, setVideos] = useState([{ VideoId:0, Title:'', Url:'', Likes:0, Dislikes:0, Views:0, Comments:''}])
    
    let navigate = useNavigate()
    let params = useParams()

    const formik = useFormik({
        initialValues: {
            VideoId: videos[0].VideoId,
            Title: videos[0].Title,
            Url: videos[0].Url,
            Likes: videos[0].Likes,
            Dislikes: videos[0].Dislikes,
            Views: videos[0].Views,
            Comments: videos[0].Comments,
            

        },
        enableReinitialize: true,
        onSubmit: (values) => {
            axios.put(`http://127.0.0.1:4000/edit-video/${params.id}`, values)
            alert('Edit Successfully..')
            navigate('/admindashboard')
        }
    })

    

    useEffect(() => {
        axios.get(`http://127.0.0.1:4000/video/${params.id}`)
            .then(res => {
                setVideos(res.data)
            })
    }, [])

    return (
        <div >
            <h3 className="mb-2">Edit Video</h3>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Video Id</dt>
                    <dd><input className="form-control w-50 " value={formik.values.VideoId} onChange={formik.handleChange} type="text" name="VideoId" /></dd>
                    <dt>Title</dt>
                    <dd><input className="form-control w-50 " value={formik.values.Title} onChange={formik.handleChange} type="text" name="Title" /></dd>
                    <dt>Url</dt>
                    <dd><input className="form-control w-50" value={formik.values.Url} onChange={formik.handleChange} type="text" name="Url" /></dd>
                    <dt>Likes</dt>
                    <dd><input className="form-control w-50" value={formik.values.Likes} onChange={formik.handleChange} type="number" name="Likes" /></dd>
                    <dt>Dislikes</dt>
                    <dd><input className="form-control w-50" value={formik.values.Dislikes} onChange={formik.handleChange} type="number" name="Dislikes" /></dd>
                    <dt>Views</dt>
                    <dd><input className="form-control w-50" value={formik.values.Views} onChange={formik.handleChange} type="number" name="Views" /></dd>
                    <dt>Comments</dt>
                    <dd><input className="form-control w-50" value={formik.values.Comments} onChange={formik.handleChange} type="text" name="Comments" /></dd>
                </dl>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    )
}
