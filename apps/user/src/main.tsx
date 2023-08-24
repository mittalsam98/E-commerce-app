import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import { RecoilRoot } from 'recoil';
import MyRoutes from './routes/MyRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <MyRoutes />
      <ToastContainer position='bottom-center' />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
