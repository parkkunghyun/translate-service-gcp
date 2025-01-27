"use client";

import { motion } from 'framer-motion';
import Image from 'next/image'
import React from 'react'

const AboutService = () => {
  return (
      <div id='about-service' className='w-full flex flex-col items-center pt-40 h-screen'>
          <p className='font-bold text-4xl'>About Service</p>
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className='flex flex-col text-md gap-2 items-center my-8'>
            <p className='md:text-sm'>이 서비스는 <span className='font-bold text-[#FF644D]'>Google Cloud의 Translate API</span>를 통해 다양한 언어로의 번역을 지원하며, </p>
            <p className='md:text-sm'><span className='font-bold text-[#FF644D]'>TTS (Text-to-Speech)</span> 기술을 활용해 번역된 텍스트를 자연스러운 음성으로 변환하여 들을 수 있습니다. </p>
            <p className='md:text-sm'>또한, <span className='font-bold text-[#FF644D]'>OCR </span>기술을 이용해 이미지 내의 텍스트를 추출하고, 번역하여 이미지 속 정보를 빠르고 정확하게 전달합니다.</p>
          </motion.div>

          <div className='flex flex-col md:flex-row justify-between items-center gap-8 mt-16 '>
              <motion.div
                  initial={{ y: 200, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className='w-[400px] flex flex-col items-center gap-2 border-2 px-4 py-2 rounded-md shadow-black'>
                      <p>OCR이란?</p>
                        <Image src={"/images/ocr1.png"}
                            alt='about-service image'
                            layout="responsive" // 부모 크기에 맞춰 비율 유지
                            width={4} // 비율의 가로
                            height={3} // 비율의 세로
                            className="rounded-lg"
                        />
                      <p className='text-gray-600 text-sm'>이미지나 문서에서 텍스트를 인식하고 추출하는 기술입니다.</p>
                    </motion.div>
              <motion.div
                  initial={{ y: 200, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.9 }}
                  className='w-[400px] h-[350px] justify-center flex flex-col items-center gap-2 border-2 px-4 py-2 rounded-md shadow-black'>
                      <p>TTS(Text-to-Speech)란?</p>
                        <Image src={"/images/tts1.png"}
                            alt='about-service image'
                            //layout="responsive" // 부모 크기에 맞춰 비율 유지
                            width={450} // 비율의 가로
                            height={400} // 비율의 세로
                            className="rounded-lg"
                        />
                      <p className='text-gray-600 text-sm mt-4'>입력된 문장을 사람의 목소리처럼 자연스러운 음성으로 변환하는 기술로, 텍스트를 청각적으로 전달할 수 있게 해줍니다.</p>
                    </motion.div>
              <div className='w-[300px] ml-30'>
                  <Image src={"/images/translate-main4.jpg"}
                      alt='about-service image'
                      layout="responsive" // 부모 크기에 맞춰 비율 유지
                      width={4} // 비율의 가로
                      height={3} // 비율의 세로
                      className="rounded-lg"
                  />
              </div>
          </div>
    </div>
  )
}

export default AboutService;
