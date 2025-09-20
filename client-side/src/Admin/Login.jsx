import React, { useState, useContext, useEffect } from 'react'
import { LucideArrowLeft, LucideEye, LucideEyeClosed } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { loginAdmin } from '../components/action.js'
import { useSelector, useDispatch } from 'react-redux';
import { setAdminStatus } from '../app/authSlice.js'

import { NotifyUser } from '../components/Notification.jsx'



const Login = () => {

    //Login States
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [message, setMessage] = useState('')
    const [isPending, setIsPending] = useState(false)
    const navigate = useNavigate()

    //Show Password 
    const [showPassword, setShowPassword] = useState(false);


    // Consume context
    // const { isAdmin, setisAdmin } = useContext(isAdminContext)

    //REDUXX
    const state = useSelector(state => state.admin.status)

    const dispatch = useDispatch();

    useEffect(() => {
        if (state) {
            navigate('/admin-panel')
        }
    }, [])




    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsPending(true)
        const formData = new FormData(e.target)
        const result = await loginAdmin(formData)
        if (result && result.AdminStatus == true) {
            // setisAdmin(result.AdminStatus)
            dispatch(setAdminStatus(result.AdminStatus));

            // setMessage(result.message)
            NotifyUser(result.message, true, 'top-right', 2000)
            // setTimeout(() => {
            // }, 2000);
            navigate('/')

            // return;
        } else {
            NotifyUser(result.message, false, 'top-right', 2000)
        }
        setIsPending(false)
    }

    const toggleShowPassowrd = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className='w-full h-full flex flex-col justify-center items-center bg-white dark:bg-black text-white'>
            <Toaster />
            <div className='h-4/5 lg:h-9/10 w-100 flex flex-col justify-between items-center gap-4 bg-gradient-to-b from-cyan-300 via-indigo-400 to-cyan-300 dark:from-indigo-900 dark:via-cyan-800 dark:to-indigo-900 text-white rounded-2xl p-10'>
                <div className='flex justify-center items-center'>
                    <Link to='/' className='relative top-1/35 -left- flex hover:text-indigo-100'>
                        <LucideArrowLeft className='w-6 h-6 mr-3' />
                        Go back to Home Page
                    </Link>
                </div>

                <div className='flex flex-col justify-center items-center gap-4 rounded-3xl'>
                    <h1 className='text-3xl text-center'>The Admin Login Panel</h1>
                    <p className=''>go back if you're not an <span className=' text-2xl'>Admin</span></p>
                </div>

                <form onSubmit={handleSubmit} className='p-10 flex flex-col justify-center items-center gap-4 rounded-xl'>
                    <input name="email" className='p-2 border-2 dark:border-white/70 border-indigo-500 focus:outline-none dark:focus:border-white focus:border-indigo-700 rounded-lg' type="email" onChange={(e) => { setemail(e.target.value) }} placeholder='Enter email' value={email} required />


                    <div className='relative'>
                        <input name="password" className='p-2 border-2 dark:border-white/70 border-indigo-500 focus:outline-none dark:focus:border-white focus:border-indigo-700 rounded-lg' type={`${showPassword ? "text" : "password"}`} onChange={(e) => { setpassword(e.target.value) }} placeholder='Enter password' value={password} required>

                        </input>
                        <span onClick={toggleShowPassowrd} className='absolute right-4 top-3'>{ showPassword  ? <LucideEye className='w-5 text-indigo-700 dark:text-slate-500'/> : <LucideEyeClosed className='w-5 text-indigo-700 dark:text-slate-500'/>}</span>
                    </div>



                    <button className='bg-indigo-700 text-white dark:bg-white dark:hover:bg-white/80 dark:text-indigo-700 text-md p-2 px-8 rounded-xl  cursor-pointer' type='submit'>Login</button>
                    {isPending ? "Loading..." : message}
                </form>
            </div>
        </div>
    )
}

export default Login
