import {useState, useEffect} from 'react'
import dividerImg from "../assets/pattern-divider-desktop.svg"

import { MdDarkMode, MdLightMode } from "react-icons/md";
import { ImDice } from "react-icons/im";

const Layout = () => {
    const [text, setText] = useState([]);
    const [theme, setTheme] = useState( localStorage.getItem('theme') || 'dark');
    const [isLoading, setIsLoading] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    // Toggle Theme
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark' );
    };

    // Fetch advice
    const fetchAdvice = async()  => {
        setIsLoading(true);
        setIsAnimating(true);
        const res = await fetch("https://api.adviceslip.com/advice");
        const data = await res.json();

        setTimeout(() => {
            setText(data);
            setIsLoading(false);
        }, 600);
        


    }

    // Toggle dark class on load
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    useEffect(() => {
        fetchAdvice();
    }, [])

    // Remove animation class after animation
    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => setIsAnimating(false), 500);
            return () => clearTimeout(timer);
        }
    }, [isAnimating]); 

  return (
    <section className={`flex justify-center items-center h-screen transition-all duration-500 ease-in-out ${theme === 'dark' ? 
    'bg-[#1E293B]' 
    : 
    'bg-[#FAFAFA]' }`}>
        {/* Advice Container */}
        <div className={`relative transition-all duration-500 ease-in-out ${theme === 'dark' ? 
            'bg-[#334155] text-[#f8fafc]' 
            :
            'bg-[#c0cbd6] text-[#1E293B]' } 
            md:w-[40%] m-auto py-12 px-6 flex flex-col gap-4 rounded-lg `}>

                {/* Advice number */}
            <h1 className={` ${theme === 'dark' ? 
                'text-[#b693ee]' 
                :
                'text-[#9333EA]'}  
                uppercase text-center text-[11px] px-4 tracking-[0.3rem]`}>Advice #{text?.slip?.id || "Loading..."} </h1>

                {/* Advice text with Animation */}
            <p className={` ${theme === 'dark' ? 
                'text-[#F8FAFC]' 
                : 
                'text-[#1E293B]'}
                text-center text-xl ${
                    isAnimating ? "animate-fadeIn" : ""
                }` }>
            "{text?.slip?.advice || "Loading..."}"
            </p>

            {/* Divider Image */}
            <div className='w-full mt-5'>
                <img src={dividerImg} alt="divider-img" className='w-full ' />
            </div>

            <div className='absolute bottom-[0] left-0 right-0 w-full flex justify-center items-center'>
                <button className={` rounded-full w-12 h-12 -mb-6 flex justify-center items-center shadow-[0_0_30px_0_#b693ee] ${theme === 'dark' ? 
                    'bg-[#b693ee] shadow-[0_0_30px_0_#b693ee]' 
                    : 
                    'bg-[#A855F7] shadow-[0_0_30px_0_#C084FC]'}
                    ${isLoading ? "animate-spin" : ""}`} 
                    onClick={fetchAdvice}>
                    
                    <ImDice />
                </button>
            </div>
        </div>

        

        <div className='absolute top-5 left-5'>
            <button className={`transition-all duration-300 ease-in-out transform hover:scale-110 ${
                theme === "dark"
                ? "bg-[#B693EE] text-white"
                : "bg-[#A855F7] text-[#1E293B]"
                } rounded-full p-3 flex justify-center items-center`}
                onClick={toggleTheme}
>
            {theme === "dark" ? <MdLightMode size={25} /> : <MdDarkMode size={25} />}
</button>
        </div>
    </section>
  )
}

export default Layout
