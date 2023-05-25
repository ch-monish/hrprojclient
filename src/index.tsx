import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import ScrollToTop from './ScrollToTop';
// import {createBrowserHistory} from 'history';
// import createBrowserHistory from 'history/createBrowserHistory'
import createHashHistory from 'history/createHashHistory'
// import historyy from './historyy'; 
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { store, persistor } from './app/store';
import LoginPage from './LoginPage';

// import historyy from './historyy';
import { PersistGate } from 'redux-persist/integration/react'
const rootElement: any = document.getElementById('root');
const root = createRoot(rootElement);
// export const history = createH({
//     // basename: '/#'


//   });
// export const history = createBrowserHistory({
//   basename: ''


// });
//  export const history = require("history").createHashHistory;
// export const history=historyy
root.render(
  // <React.StrictMode>
      <Provider store={store}>

        <PersistGate persistor={persistor}>


          {/* <ScrollToTop> */}
    <BrowserRouter basename='/HRWorkflowPortal'>

            <App></App>
    </BrowserRouter>
          {/* </ScrollToTop> */}

        </PersistGate>
      </Provider>
  // </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();