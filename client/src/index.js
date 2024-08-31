import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
//RTK...
import { Provider } from 'react-redux';
import { Store } from './RTK/Store';

//Toaster...
import {Toaster} from 'react-hot-toast';


import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={Store}>
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
  
);


reportWebVitals();
