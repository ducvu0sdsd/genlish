import React, { useContext, useEffect, useState } from 'react'
import Introduce from './Introduce'
import Step from './Step'
import Gate from './Gate'
import { api, TypeHTTP } from '@/utils/api'
import { authContext } from '@/context/AuthContext'
import { studyContext } from '@/context/StudyContext'

const StudySchedule = () => {

    const [doors, setDoors] = useState([])
    const [gates, setGates] = useState([])
    const { studyData } = useContext(studyContext)

    return (
        <div className='w-[53%] flex flex-col items-center h-screen overflow-auto'>
            {studyData.doors.map((door, index) => (
                <Gate key={index} door={door} />
            ))}
        </div>
    )
}

export default StudySchedule