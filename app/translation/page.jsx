"use client";
import React, { useState } from 'react'
import Navbar from '../components/(translate-ui)/navbar'
import TranslatedComponent from '../components/(translate-ui)/TranslatedComponent';
import ImageTranslatedComponent from '../components/(translate-ui)/ImageTranslatedComponent';

const TranslationPage = () => {
  const [choice, setChoice] = useState("translate");

  return (
    <div className='w-full h-screen gap-8 bg-[#FFF6F6] flex flex-col items-center pt-40'>
      <Navbar choice={choice} setChoice={setChoice} />
      {
        choice === "translate" ? <TranslatedComponent/> : <ImageTranslatedComponent/>
      }
    </div>
  )
}

export default TranslationPage