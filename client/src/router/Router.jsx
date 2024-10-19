import React, { Fragment, useContext } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import appContext from '../context/appContext'
import Home from '../pages/Home'
import About from '../pages/About'
import Dispute from '../pages/Dispute'
import Profile from '../pages/Profile'
import PageNotFound from '../pages/PageNotFound'

function Router() {
  const { State } = useContext(appContext);
  const {
    WalletAddress
  } = State;

  return (
    <Fragment>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' index element={<Home />}/>
                <Route path='/about' index element={<About />}/>
                <Route path='/dispute' element={(WalletAddress) ? <Dispute /> : <Dashboard />}/>
                <Route path='/profile' element={(WalletAddress) ? <Profile /> : <Dashboard />}/>
                <Route path='*' element={<PageNotFound />}/>
            </Routes>
            <Outlet />
            <Footer />
        </BrowserRouter>
    </Fragment>
  )
}

export default Router