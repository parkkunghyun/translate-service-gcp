"use client";
import React, { useState } from 'react'
import Navbar from '../components/(translate-ui)/Navbar';
import TranslatedComponent from '../components/(translate-ui)/TranslatedComponent';
import ImageTranslatedComponent from '../components/(translate-ui)/ImageTranslatedComponent';
import { IoIosArrowBack } from "react-icons/io";
import Link from 'next/link';

const TranslationPage = () => {
  const [choice, setChoice] = useState("translate");

  return (
    <div className='w-full h-screen gap-4 bg-[#FFF6F6] flex flex-col items-center pt-8'>
      <Link href={"/"}>
      <IoIosArrowBack className='fixed text-4xl font-bold duration-300 cursor-pointer top-4 left-4 hover:scale-105'/>
      </Link>
      <Navbar choice={choice} setChoice={setChoice} />
      {
        choice === "translate" ? <TranslatedComponent/> : <ImageTranslatedComponent/>
      }
    </div>
  )
}

export default TranslationPage