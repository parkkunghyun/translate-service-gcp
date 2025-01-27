"use client";
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link';
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";

const HomeComponent = () => {
  return (
      <div id='home' className=' flex min-w-[600px] h-screen pt-30 w-full justify-around'>
          <div
          className='flex flex-col items-start gap-4 mt-16'>
              <motion.div
                  initial={{ x: -200, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{duration: 1}}
                  className='flex flex-col items-start gap-4'>
                <p className='text-3xl text-[#FF644D] '>언어의 경계를 허무는 AI 번역 플랫폼,</p>
                <span className='text-5xl text-[#FF644D] font-Oswald'>LinguaLens</span>
              </motion.div>

              <Link href={"/translation"} className='px-4 py-2 my-4 duration-300 border-2 rounded-lg shadow-black hover:scale-105'>번역 체험하기</Link>

              <motion.p
                  initial={{  scale: 0 }}
                  whileInView={{  scale: 1 }}
                  transition={{duration: 0.8, type: 'spring', stiffness: 100}}
                  className='mt-8 font-bold text-md'>
                  "텍스트를 넘어, 이미지를 읽고 번역하며, 생생한 음성으로 전달합니다. <br /> 지금, 새로운 번역의 경험을 만나보세요!"
              </motion.p>

              <Link className='flex bg-[#FFF6F6] justify-center hover:scale-105 duration-300 shadow-lg rounded-md items-center w-full mx-auto mt-24 text-center' href="#about-service">
                <p className='font-bold text-gray-600'>서비스 상세 설명</p>
                <MdOutlineKeyboardDoubleArrowDown className='text-6xl  text-[#FF644D] '/>
              </Link>
          </div>
          <motion.div
              initial={{ x: 200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{duration:1, delay:0.5}}
              className='hidden sm:block w-[600px]'>
            <Image
                src="/images/translate-main.jpg"
                alt="main image"
                layout="responsive" // 부모 크기에 맞춰 비율 유지
                width={4} // 비율의 가로
                height={3} // 비율의 세로
                className="rounded-lg"
                />
          </motion.div>
      </div>
  )
}

export default HomeComponent