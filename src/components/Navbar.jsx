import React from 'react'

const Navbar = () => {
  return (
    <>
    <div className='max-w-screen-2xl mx-auto container px-6 md:px-40 shadow-lg h-16 py-3'>
        <div className='flex justify-between'>
            <h1 className='text-2xl cursor-pointer font-bold '>WordToPdf</h1>
            <h1 className='text-2xl cursor-pointer font-bold hover:scale-125 duration-300'>Home</h1>
        </div>
    </div>
    
    </>
  )
}

export default Navbar