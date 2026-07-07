import React from 'react'

const Navbar = ({ isDark }) => {
    return (
        <div className={`flex justify-between items-center bg-blue-200 px-2 py-1 ${isDark ? 'bg-gray-500 text-white' : ''}`}>
            <h2 className={`ml-2 font-bold text-2xl sm:text-3xl lg:text-4xl ${isDark ? '' : ''}`}>To-Do</h2>
            <ul className={`flex gap-6 sm:gap-12 lg:gap-20 ${isDark ? '' : ''}`}>
                <li className={`text-xs sm:text-sm lg:text-base cursor-pointer hover:font-bold transition-all duration-75 ${isDark ? '' : ''}`}>Home</li>
                <li className={`mr-4 sm:mr-6 lg:mr-8 text-xs sm:text-sm lg:text-base cursor-pointer hover:font-bold transition-all duration-75 ${isDark ? '' : ''}`}>About</li>
            </ul>
        </div>
    )
}

export default Navbar
