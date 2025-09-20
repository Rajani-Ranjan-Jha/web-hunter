import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import './App.css';
import App from './App.jsx';
import Login from './Admin/Login.jsx';
import User from './Home/Home.jsx'
import AdminPanel from './components/AdminPanel.jsx';

import isAdminContext from './context/isAdminContext';
import IsAdminContextProvider from './context/IsAdminContextProvider';

import ProtectedRoutes from './actions/ProtectedRoutes.js';
import { AuthorizeAdmin } from './actions/Authorize.js';

import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import About from './About/About.jsx';
import Bookmarks from './components/Bookmarks.jsx';

import ErrorPage from './components/ErrorPage.jsx';

const root = document.getElementById('root');

function RouterComponent() {
  const state = useSelector(state => state.admin.status);

  AuthorizeAdmin();

  // const { isAdmin, setisAdmin } = useContext(isAdminContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<App />} >
        {/* <Route path='' index={true} element={<Login />} /> */}
        <Route path='' element={<User />} />
        {/* <Route path='page-:pageNumber' element={<Bookmarks />} /> */}
        {<Route path='admin-panel' element={
          <ProtectedRoutes>
            <AdminPanel />
          </ProtectedRoutes>
        } />}
        <Route path='admin-login' element={<Login />} />
        <Route path='about' element={<About />} />
        <Route path='bookmarks' element={<Bookmarks />} />
        <Route path='*' element={<User />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <RouterComponent />
  </Provider>
);
