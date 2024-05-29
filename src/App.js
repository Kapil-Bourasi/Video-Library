
import { useCookies } from 'react-cookie';
import { BrowserRouter, Routes, Route,  Link, useNavigate } from 'react-router-dom';
import { MainVideo } from './components/video-main';
import { UserLogin } from './components/user-login';
import { AdminLogin } from './components/admin-login';
import { AdminDashboard } from './components/admin-dashboard';
import { UserDashboard } from './components/user-dashboard';
import { UserRegister } from './components/add-users';
import { AddVideos } from './components/add-video';
import { EditVideo } from './components/edit-video';
import { DeleteVideo } from './components/delete-video';

function SignOut() {
  const [cookies, setCookies, removeCookies] = useCookies("userName")
  let navigate = useNavigate()
  function handleSingOut() {
    removeCookies("userName")
    navigate("/userlogin")
    window.location.reload()
  }
  return (
    <button onClick={handleSingOut} className='btn btn-sm btn-warning me-3'>SignOut</button>
  )
}

function App() {

  const [cookies, setCookies, removeCookies] = useCookies("userName");
  return (<>
    <div  className='container-fluid' id='body' style={{ height: '100%'}}>
      <BrowserRouter>
        <header className='p-2 d-flex justify-content-between'>
          <div className='m-3 text-bg-danger p-2 rounded'>
            <span className='h4 fst-italic'><Link to='/' style={{ color: 'white', textDecoration: 'none' }}>Video Library</Link></span>
          </div>
          <div>
            {(cookies['userName'] == undefined)?<Link className='btn btn-warning m-2 me-2' to='/userlogin' >User SignIN</Link>:<SignOut />}
            <Link to='/adminlogin' className='btn btn-primary'><span className='bi bi-person-fill '></span>Admin Dashboard</Link>
          </div>
        </header>
        <section>
          <Routes>
            <Route path='/' element={<MainVideo/>} />
            <Route path='userlogin' element={<UserLogin/>} />
            <Route path='add-user' element={<UserRegister/>} />
            <Route path='userdashboard' element={<UserDashboard />} />
            <Route path='adminlogin' element={<AdminLogin />} />
            <Route path='admindashboard' element={<AdminDashboard />} />
            <Route path='add-videos' element={<AddVideos />} />
            <Route path='edit-video/:id' element={<EditVideo />} />
            <Route path='delete-video/:id' element={<DeleteVideo />} />
          </Routes>
        </section>
      </BrowserRouter>
    </div>
  </>)
}

export default App;
