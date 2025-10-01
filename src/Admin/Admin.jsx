import React from 'react'
import Header from '../Components/Header'
import AdminSidebar from './Admin sidebar'
import { Outlet} from 'react-router-dom'

function Admin() {
  return (
    <div className='p-0'>
      <Header />
      <div className="d-flex">
        <AdminSidebar />
        <div className="flex-grow-2 w-100 container-fluid mt-3">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Admin