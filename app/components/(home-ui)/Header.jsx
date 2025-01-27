import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
      <div className='flex px-4 fixed shadow-md gap-8 bg-[#FFF6F6] py-4 items-center top-0 right-0 left-0'>
          <a href="/"><Image className='cursor-pointer' src={"/images/tr-logo.png"} alt='logo image' width={50} height={50} /></a>
          <a className='hover:scale-105 font-bold text-xl' href="/#home">Home</a>
          <a className='hover:scale-105 font-bold text-xl' href="#about-service">About Service</a>
    </div>
  )
}

export default Header