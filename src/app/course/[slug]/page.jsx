'use client'
import Navbar from '@/components/Navbar'

import React, { useContext, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { api, TypeHTTP } from '@/utils/api'
import { useParams } from 'next/navigation'
import DetailCourse from '@/components/course/DetailCourse'
import ViewingCourse from '@/components/course/ViewingCourse'
import { authContext } from '@/context/AuthContext'
import { payloadContext } from '@/context/PayloadContext'
const CourseDetail = () => {

    const { slug } = useParams()
    const [course, setCourse] = useState()
    const [study, setStudy] = useState(false)
    const wrapperRef = useRef()
    const { authData } = useContext(authContext)
    const { payloadHandler, payloadData } = useContext(payloadContext)


    useEffect(() => {
        if (authData.user?._id, course?._id) {
            api({ sendToken: true, type: TypeHTTP.GET, path: `/studycourse/get-by-student-and-course?studentid=${authData.user._id}&courseid=${course._id}` })
                .then(res => payloadHandler.setStudyCourse(res))
        }
    }, [authData.user?._id, course?._id])

    useEffect(() => {
        api({ type: TypeHTTP.GET, sendToken: true, path: `/course/get-by-slug/${slug}` })
            .then(res => {
                setCourse(res)
            })
    }, [slug])

    useEffect(() => {
        if (wrapperRef.current) {
            if (study) {
                wrapperRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                wrapperRef.current.style.overflow = 'hidden'
            } else {
                wrapperRef.current.style.overflow = 'auto'
            }
        }
    }, [study, wrapperRef.current])

    return (
        <motion.div
            initial={{ x: 200 * -1 }}
            animate={{ x: 0 }}
            exit={{ x: 1920 * -1, transition: { duration: 0.2 } }}
        >
            <section className='w-full h-screen flex'>
                <Navbar />
                <div ref={wrapperRef} className=' w-[82%] flex h-screen overflow-y-auto'>
                    {course && (
                        <div style={{ transition: '0.5s', marginLeft: study ? '-100%' : '0' }} className='w-[100%] flex overflow-x-hidden overflow-y-auto'>
                            <DetailCourse course={course} setStudy={setStudy} />
                            <ViewingCourse course={course} setStudy={setStudy} setCourse={setCourse} />
                        </div>
                    )}
                </div>
            </section>
        </motion.div>
    )
}

export default CourseDetail