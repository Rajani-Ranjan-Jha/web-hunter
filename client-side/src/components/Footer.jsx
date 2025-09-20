import React from 'react'
import { Link } from 'react-router-dom'
import { LucideHeart } from 'lucide-react'
import { waapi, animate, svg, stagger } from 'animejs';


const Footer = () => {

    animate('.span-icon', {
        rotate: {
            from: '-1turn',
            to: '1turn',
            duration: 1000,
            delay: 50
        },
        scale: {    
            from: 1,
            to: 1.2,
            duration: 1000,
            delay: 50
        },
        delay: (_, i) => i * 50,
        ease: 'inOutCirc',
        loopDelay: 1000,
        alternate: true,
        loop: true
    });
    return (
        <div className='w-full py-10 dark:font-extralight text-sm text-indigo-700 dark:text-white bg-indigo-300 dark:bg-indigo-700 p-4 flex justify-between items-center'>
            <p className='text-sm'>&copy; 2025 Web Hunter. All rights reserved.</p>
            <div className='flex gap-4 text-sm justify-self-center underline'>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
            </div>
            <p className='flex text-sm'>Made with <span className='span-icon mx-2'><LucideHeart className='w-5 text-red-500' /></span> in Earth</p>
        </div>
    )
}

export default Footer
