'use client'

import { createContext, useContext, useEffect, useRef, useState } from "react";
export const payloadContext = createContext()

const PayloadProvider = ({ children }) => {

    // dùng để Note theo thời gian bài học
    const [course, setCourse] = useState()
    const [studyCourse, setStudyCourse] = useState()
    const [time, setTime] = useState()
    const [currentEpisode, setCurrentEpisode] = useState()

    const data = {
        studyCourse, time, course, currentEpisode
    }

    const handler = {
        setStudyCourse, setTime, setCourse, setCurrentEpisode
    }

    return (
        <payloadContext.Provider value={{ payloadData: data, payloadHandler: handler }}>
            {children}
        </payloadContext.Provider >
    )
}

export default PayloadProvider
