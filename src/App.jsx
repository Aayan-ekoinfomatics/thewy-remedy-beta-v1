import { Route, Routes } from 'react-router-dom'
import AppAdmin from './admin/AppAdmin'
import AppClient from './client/AppClient'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css'
import logo from "./admin/assets/img/thewy-main.png";


function App() {

  const setUser = (user) => {
    localStorage.setItem('userRole', user);
    window.location.reload();
  }

  return (
    <>
      <div className="relative">
        {
          localStorage?.getItem('userRole') === 'admin' ? (
            <AppAdmin />
          ) : (
            <AppClient />
          )
        }
        {/* <AppAdmin /> */}
      </div>
      <ToastContainer />
    </>
  )
}

export default App
