import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";



export function AddVideos() {
    let navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            VideoId: '',
            Title: '',
            Url: '',
            Likes: 0,
            Dislikes: 0,
            Views: 0,
            Comments: '',
            CategoryId: 0
        },
        onSubmit: (values) => {
            axios.post(`http://127.0.0.1:4000/add-video`, values)
            alert('Video Added Successfully')
            navigate('/admindashboard')
        }
    })

    return (
        <>
            <div className="d-flex justify-content-center" >
                <div className="text-dark p-2 m-2 rounded-2 w-25">
                    <h4> Add New Videos</h4>
                    <form onSubmit={formik.handleSubmit} >
                        <dl className="ms-2 small text-black">
                            <dt>Video Id</dt>
                            <dd><input type="text" className="form-control w-75" onChange={formik.handleChange} name="VideoId" /></dd>
                            <dt>Title</dt>
                            <dd><input type="text" className="form-control w-75" onChange={formik.handleChange} name="Title" /></dd>
                            <dt>Url</dt>
                            <dd><input type="text" className="form-control w-75" onChange={formik.handleChange} name="Url" /></dd>
                            <dt>Likes</dt>
                            <dd><input type="number" className="form-control w-75" onChange={formik.handleChange} name="Likes" /></dd>
                            <dt>Dislikes</dt>
                            <dd><input type="number" className="form-control w-75" onChange={formik.handleChange} name="Dislikes" /></dd>
                            <dt>Views</dt>
                            <dd><input type="number" className="form-control w-75" onChange={formik.handleChange} name="Views" /></dd>
                            <dt>Comments</dt>
                            <dd><input type="text" className="form-control w-75" onChange={formik.handleChange} name="Comments" /></dd>
                        </dl>
                        <button className="btn btn-primary" type="sumit">Add</button>
                    </form>
                </div>
            </div>
        </>
    )
}