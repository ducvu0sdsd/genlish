'use client'
import MoreInformation from '@/components/learn/MoreInformation'
import StudySchedule from '@/components/learn/StudySchedule'
import Navbar from '@/components/Navbar'
import { authContext } from '@/context/AuthContext'
import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { studyContext } from '@/context/StudyContext'
import ListGate from '@/components/learn/ListGate'
const Learn = () => {

    const { studyData, studyHandler } = useContext(studyContext)

    return (
        <motion.div
            initial={{ x: 200 * -1 }}
            animate={{ x: 0 }}
            exit={{ x: 1920 * -1, transition: { duration: 0.2 } }}
        >
            <section className='w-full h-screen flex'>
                <Navbar />
                {(studyData.currentGate && studyData.showSchedule) ?
                    studyData.doors.length > 0 ? (
                        <>
                            <StudySchedule />
                            <MoreInformation />
                        </>
                    ) :
                        (
                            <div className=' w-[82%] flex flex-col h-screen justify-center items-center gap-2 overflow-y-auto'>
                                <span>Hiện Chưa Có Bài Học Cho Chương Này</span>
                                <span onClick={() => {
                                    studyHandler.setShowSchedule(false)
                                    studyHandler.setCurrentGate()
                                }} className='font-bold cursor-pointer'>Trở Về</span>
                            </div>
                        )
                    : (
                        <ListGate />
                    )}
            </section>
        </motion.div>
    )
}

export default Learn