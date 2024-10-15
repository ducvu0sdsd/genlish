'use client'
import Navbar from '@/components/Navbar'

import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { api, TypeHTTP } from '@/utils/api'
import { mainColor } from '@/utils/color'
import { convertSecondsToReadableFormat } from '@/utils/time'
import { formatMoney, removeVietnameseTones } from '@/utils/other'
import { notifyContext } from '@/context/NotifyContext'
const Course = () => {

    const [courses, setCourses] = useState([])
    const { notifyHandler } = useContext(notifyContext)

    useEffect(() => {
        api({ type: TypeHTTP.GET, sendToken: true, path: '/course/get-all' })
            .then(res => {
                console.log(res)
                setCourses(res)
            })
    }, [])

    return (
        <motion.div
            initial={{ x: 200 * -1 }}
            animate={{ x: 0 }}
            exit={{ x: 1920 * -1, transition: { duration: 0.2 } }}
        >
            <section className='w-full h-screen flex'>
                <Navbar />
                <div className=' w-[82%] p-[1.5rem] h-screen overflow-y-auto'>
                    <div className='text-[20px] font-semibold'>Các khóa học</div>
                    <div className='w-full flex flex-wrap mt-[1rem] gap-4'>
                        {courses.map((course, index) => (
                            <div onClick={() => notifyHandler.navigate(`/course/${removeVietnameseTones(course.slug)}`)} className='transition-all hover:scale-[1.05] cursor-pointer flex flex-col w-[250px] pb-2 shadow-xl rounded-xl' key={index}>
                                <img src={course.image} width={'100%'} className='rounded-t-xl' />
                                <span className='font-medium text-[15px] w-full px-3 mt-2'>{course.title}</span>
                                <span className={`font-semibold text-[14px] text-[#5dade2] mt-1 w-full px-3`}>{course.type === 'free' ? 'Miễn Phí' : `${formatMoney(course.price)} đ`}</span>
                                <div className='flex gap-1 relative items-center px-2 mt-1'>
                                    <img src={course.teacher.avatar} className='w-[25px] aspect-square rounded-full' />
                                    <span className='text-[13px] text-[#4d4d4d]'>{course.teacher.fullName}</span>
                                    <span className='absolute flex items-center gap-1 text-[#4d4d4d] text-[14px] right-3 top-[50%] translate-y-[-50%]'>
                                        <i className='bx bx-time-five translate-y-[1px]'></i>
                                        {convertSecondsToReadableFormat(
                                            course.list_course.reduce((total, item) => total + item.duration, 0)
                                        )}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </motion.div>
    )
}

export default Course