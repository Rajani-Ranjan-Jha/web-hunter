import React from 'react'
import { waapi, animate, svg, stagger } from 'animejs';


const About = () => {

    // waapi.animate('span', {
    //     translate: `0 -1.5rem`,
    //     // rotate: '${[0, 360]}',
    //     delay: stagger(200),
    //     duration: 700,
    //     loop: true,
    //     alternate: true,
    //     ease: 'inOut(2)',
    // });



    animate('.span-animate', {
  // Property keyframes
  y: [
    { to: '-2.75rem', ease: 'outExpo', duration: 600 },
    { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
  ],
  // Property specific parameters
  rotate: {
    from: '-1turn',
    to: '1turn',
    duration: 1000,
    // easing: 'easeInOutSine',

    delay: 50
  },
  delay: (_, i) => i * 50, // Function based value
  ease: 'inOutCirc',
  loopDelay: 1000,
  loop: true
});

    return (
        <div className='w-full bg-white dark:bg-black flex flex-col items-center justify-center gap-5 text-center'>
            <div className='w-4/5 p-5 my-5 rounded-lg flex flex-col items-start  justify-start gap-2 text-left dark:text-white bg-gradient-to-b from-cyan-300 via-indigo-400 to-cyan-300 dark:from-indigo-900 dark:via-cyan-800 dark:to-indigo-900'>

                <div className='w-full h-50 flex justify-center items-center gap-2'>
                    <h2 className="flex items-center justify-center text-5xl font-semibold text-white">
                        <span className='span-animate'>A</span>
                        <span className='span-animate'>b</span>
                        <span className='span-animate'>o</span>
                        <span className='span-animate'>u</span>
                        <span className='span-animate'>t</span>
                        <span className='span-animate'>&nbsp;</span>
                        <span className='span-animate'>&nbsp;</span>
                        <span className='span-animate'>P</span>
                        <span className='span-animate'>r</span>
                        <span className='span-animate'>o</span>
                        <span className='span-animate'>j</span>
                        <span className='span-animate'>e</span>
                        <span className='span-animate'>c</span>
                        <span className='span-animate'>t</span>
                    </h2>
                </div>
                <div className='p-5 flex flex-col items-start  justify-start gap-2 text-left'>
                    <h2 className='text-2xl font-semibold'>What ?</h2>
                    <p className='font-light'>A vast array of websites from all over the internet are featured on Web Hunter, a carefully curated platform. Discovery is made easy, quick, and visually appealing by presenting each entry as a card that includes the name of the website, a brief description, its category, and a direct visit link.</p>
                </div>
                <div className='p-5 flex flex-col items-start  justify-start gap-2 text-left'>
                    <h2 className='text-2xl font-semibold'>Why ?</h2>
                    <p className='font-light'>With so many new websites being made every day, it can be difficult to find ones that are inspiring, unique, or helpful. By arranging and displaying websites in a clear, categorised manner, Web Hunter was created to make this process easier for users and help them find digital treasures they might otherwise overlook while browsing the internet.</p>
                </div>
                <div className='p-5 flex flex-col items-start  justify-start gap-2 text-left'>
                    <h2 className='text-2xl font-semibold'>Who ?</h2>
                    <p className='font-light'><a className='underline' href="https://rajani-ranjan-jha.vercel.app/">Rajani Ranjan Jha</a>   (me), an enthusiastic developer from IIT Patna, is the creator and maintainer of Web Hunter. His commitment to web exploration, design, and utility is evident in this project, which aims to create tools that assist everyone in discovering the internet, from casual browsers to inquisitive creators.</p>
                </div>

            </div>
        </div>
    )
}

export default About
