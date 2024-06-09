import { useState } from 'react';
import { Outlet } from 'react-router';
import Navigation from './pages/Auth/Navigation';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <>
      <ToastContainer/>
      <Navigation/>
      <main>
        <Outlet/>
      </main>
    </>
  )
}

export default App
