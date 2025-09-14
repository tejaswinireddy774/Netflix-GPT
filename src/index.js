import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './index.css';
import Main from './Components/Main';
import Login from './Components/Login';
import {Provider} from 'react-redux';
import appStore from "./Utils/appStore.js";
import Browser from './Components/Browser.js';
import GptMovieSuggestions from './Components/GptMovieSuggestions.js';
import Watch from "./Components/Watch.js";
import MyList from './Components/MyList.js';
import BrowseContainer from './Components/BrowseContainer.js';

const App = () => {
  return (
    <Provider store ={appStore}>
    <div className="app">
      <Outlet />
    </div>
    </Provider>
  );
};


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Page Not Found</div>,
    children: [
      {
        path: '', 
        element: <Main />,
      },
      {
        path: '/login', 
        element: <Login />,
      },
      {
        path: '/browser',
        element: <Browser />,
      },
      {
        path: '/search',
        element: <GptMovieSuggestions />,
      },
      {
  path: '/watch/:movieId',
  element: <Watch />,
},
{
  path: "/my-list",
  element: <MyList />
},
{
  path: "/browse/:tab",
  element: <BrowseContainer />
},
    ],
  },
]); 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);

reportWebVitals();
