import React from 'react';
import './App.css';

//Imports
import Links from './components/Links';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
  <div className="container p-4">
    <h1 className="title">Links Storage <span role="img">🚀</span></h1>
    <h2 className="subtitle pb-4">Manage multiples links and save them. All thanks to FireBase</h2>
    <div className="row">
      <Links/>
      <ToastContainer/>
    </div>
  </div>
  );
}

export default App;
