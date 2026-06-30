import React from 'react'

const Footer = ({isDark}) => {
  return (
    <div className={`flex justify-center pb-5 ${isDark ? 'bg-black text-white' : ''}`}>
      To-Do Page
    </div>
  )
}

export default Footer
