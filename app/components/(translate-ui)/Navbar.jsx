import React from 'react'

const Navbar = ({choice, setChoice}) => {
  return (
      <div className='w-[600px] flex justify-around items-center bg-white rounded-full shadow-lg py-4 px-2 mb-8'>
          <p className={`cursor-pointer ${choice === 'translate' && 'text-[#FF644D]'}`} onClick={() => setChoice("translate")}>Smart Text</p>
          <p className={`cursor-pointer ${choice !== 'translate' && 'text-[#FF644D]'}`}  onClick={() => setChoice("image translator")}>Image Translator</p>
    </div>
  )
}

export default Navbar