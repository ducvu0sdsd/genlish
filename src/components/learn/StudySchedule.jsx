import React, { useContext, useEffect, useState } from 'react'
import Introduce from './Introduce'
import Step from './Step'
import Gate from './Gate'
import { api, TypeHTTP } from '@/utils/api'
import { authContext } from '@/context/AuthContext'

const StudySchedule = () => {

    const [doors, setDoors] = useState([])
    const [gates, setGates] = useState([])
    const { authData } = useContext(authContext)

    useEffect(() => {
        if (authData.user) {
            api({ type: TypeHTTP.GET, path: '/gate/get-all', sendToken: false, })
                .then(gates => setGates(gates))
        }
    }, [authData.user])

    useEffect(() => {
        if (gates.length > 0) {
            api({ sendToken: false, path: `/door/get-by-gate/${gates[0]._id}`, type: TypeHTTP.GET })
                .then(doors => setDoors(doors))
        }
    }, [gates])

    return (
        <div className='w-[50%] flex flex-col items-center h-screen overflow-auto'>
            {doors.map((door, index) => (
                <Gate key={index} door={door} />
            ))}
        </div>
    )
}

export default StudySchedule