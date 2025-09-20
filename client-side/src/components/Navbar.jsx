import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { ChevronUp, ChevronDown } from 'lucide-react'
import { logoutAdmin } from './action';
import { setAdminStatus, setUserData } from '../app/authSlice';
import { NotifyUser } from './Notification';

const Navbar = () => {
  // const { isAdmin } = useContext(isAdminContext)
  const isAdmin = useSelector(state => state.admin.status)
  const UserData = useSelector(state => state.admin.name)


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentSite = useLocation()

  const [isOpen, setIsOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  // Theme state and logic
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    isDropDownOpen ? setIsDropDownOpen(false) : null
  };


  // Function to toggle theme
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    // console.log('theme value:', localStorage.getItem('theme'))
  };

  const toggleDropDown = () => {
    // const content = document.getElementById('dropdown-content')
    setIsDropDownOpen(!isDropDownOpen)
  }

  const handleLogOut = async () => {
    try {
      const result = await logoutAdmin()
      if (result.success) {
        console.log(result.message);
        NotifyUser('Logged Out',true,'top-left')
        dispatch(setAdminStatus(false))
        dispatch(setUserData(null))
        navigate('/')
        // window.location.reload()
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <nav className={`px-4 py-3 text-indigo-700 dark:text-white bg-indigo-300 dark:bg-indigo-700`}>
      <div className='flex items-center justify-between'>
        <div className='font-semibold text-3xl'>
          <Link to={'/'}>Web Hunter</Link>
        </div>


        <div className='block md:hidden transition-all duration-300 ease-in-out'>
          <button onClick={toggleMenu} aria-label="Toggle menu" className="focus:outline-none transition-all duration-300 ease-in-out">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>

        <div id='nav-holder' className={`md:flex-row md:flex md:items-center md:gap-5 absolute md:static md:bg-transparent  w-full md:w-auto left-0 md:left-auto top-14 md:top-auto transition-all duration-300 ease-in-out ${isOpen ? 'flex flex-col items-center z-10 bg-indigo-300 dark:bg-indigo-700' : 'hidden'}`}>
          <Link onClick={toggleMenu} to="/" className='block px-2 mx-auto py-3 rounded-2xl font-semibold dark:text-white/80 cursor-pointer hover:bg-white/20 md:inline-block'>Home</Link>
          <Link onClick={toggleMenu} to="/about" className='block px-2 mx-auto py-3 rounded-2xl font-semibold dark:text-white/80 cursor-pointer hover:bg-white/20 md:inline-block'>About</Link>


          {theme === 'dark' ? (
            // Sun SVG for light theme
            <button onClick={toggleTheme} className={`p-2 ${isOpen ? "mb-2" : ""}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-sun" viewBox="0 0 16 16">
                <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
              </svg>
            </button>

          ) : (
            // Moon SVG for dark theme
            <button onClick={toggleTheme} className={`p-2 ${isOpen ? "mb-2" : ""}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-moon" viewBox="0 0 16 16">
                <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286" />
              </svg>
            </button>

          )}

          {isAdmin ? (
            <div className='relative hover:border-b hover:rounded-2xl hover:bg-indigo-200 dark:hover:bg-indigo-500'>
              <button className='cursor-pointer  px-4 mx-auto py-2 flex justify-around' onClick={toggleDropDown}>{UserData}
                <span className='ml-2'>{isDropDownOpen ? <ChevronUp /> : <ChevronDown />}</span>
              </button>
              <ul id='dropdown-content' className={`w-full absolute bg-indigo-300 dark:bg-indigo-700 border-t rounded-2xl py-2 px-1 space-y-1 top-10 ${isDropDownOpen ? "block" : "hidden"}`}>
                {(currentSite.pathname !== '/admin-panel' &&
                  <li className=' flex'>
                    <Link onClick={toggleDropDown} to="/admin-panel" className='w-full px-4 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-700/80 text-white text-center dark:bg-white dark:hover:bg-white/80 cursor-pointer dark:text-indigo-600'>Add Data</Link>
                  </li>)}
                {(currentSite.pathname !== '/bookmarks' &&
                  <li className='flex'>
                    <Link onClick={toggleDropDown} to={'/bookmarks'} className='w-full px-4 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-700/80 text-white text-center dark:bg-white dark:hover:bg-white/80 cursor-pointer dark:text-indigo-600'>Bookmarks</Link>
                  </li>
                )}
                <li className='flex'>
                  <button onClick={handleLogOut} className='w-full px-4 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-700/80 text-white dark:bg-white dark:hover:bg-white/80 cursor-pointer dark:text-indigo-600'>LogOut</button>
                </li>
              </ul>
            </div>

          ) : (
            <div className='min-w-36 relative hover:border-b hover:rounded-2xl hover:bg-indigo-200 dark:hover:bg-indigo-500'>
              <button className='cursor-pointer  px-4 mx-auto py-2 flex justify-around' onClick={toggleDropDown}>More
                <span className='ml-2'>{isDropDownOpen ? <ChevronUp /> : <ChevronDown />}</span>
              </button>
              <ul id='dropdown-content' className={`w-full absolute bg-indigo-300 dark:bg-indigo-700 border-t rounded-2xl py-2 px-1 space-y-1 top-10 ${isDropDownOpen ? "block" : "hidden"}`}>
                {(currentSite.pathname !== '/admin-login' &&
                  <li className='flex'>
                    <Link onClick={toggleMenu} to="/admin-login" className='w-full px-4 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-700/80 text-white text-center dark:bg-white dark:hover:bg-white/80 cursor-pointer dark:text-indigo-600'>Login</Link>
                  </li>
                )}
                {(currentSite.pathname !== '/bookmarks' &&
                  <li className='flex'>
                    <Link onClick={toggleDropDown} to={'/bookmarks'} className='w-full px-4 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-700/80 text-white text-center dark:bg-white dark:hover:bg-white/80 cursor-pointer dark:text-indigo-600'>Bookmarks</Link>
                  </li>
                )}

              </ul>
            </div>

          )}
          {/* {isAdmin ? (
            <Link onClick={toggleMenu} to="/admin-panel" className='px-4 mx-auto py-2 rounded-2xl bg-indigo-700 hover:bg-indigo-700/80 text-white dark:bg-white dark:hover:bg-white/80 cursor-pointer dark:text-indigo-600'>Add Data</Link>
          ) : (
            <Link onClick={toggleMenu} to="/admin-login" className='px-4 mx-auto py-2 rounded-2xl bg-indigo-700 hover:bg-indigo-700/80 text-white dark:bg-white dark:hover:bg-white/80 cursor-pointer dark:text-indigo-600'>Login</Link>
          )} */}

        </div>
      </div>
    </nav>
  )
}

export default Navbar

