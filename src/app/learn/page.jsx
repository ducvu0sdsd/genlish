'use client'
import MoreInformation from '@/components/learn/MoreInformation'
import StudySchedule from '@/components/learn/StudySchedule'
import Navbar from '@/components/Navbar'
import { authContext } from '@/context/AuthContext'
import React, { useContext } from 'react'

const Learn = () => {

    return (
        <section className='w-full h-screen flex'>
            <Navbar />
            <StudySchedule />
            <MoreInformation />
        </section>
    )
}

export default Learn