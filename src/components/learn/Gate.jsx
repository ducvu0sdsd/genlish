import React, { useEffect, useRef, useState } from 'react'
import Introduce from './Introduce'
import Step from './Step'
import SpiritBeast from './SpiritBeast'

const Gate = ({ door }) => {
    const wrapperRef = useRef()
    const [steps, setSteps] = useState([])
    const [width, setWidth] = useState(0)

    useEffect(() => {
        if (door) {
            const arr = []
            for (let i = 1; i <= door.individual.numberOfTest; i++) {
                arr.push(i)
            }
            setSteps(arr)
        }
    }, [door])

    useEffect(() => {
        if (wrapperRef.current) {
            setWidth(wrapperRef.current.offsetWidth)
        }
    }, [wrapperRef.current])

    const getPosition = (index) => {
        const end = width / 3
        const between = Math.floor(steps.length / 2) + 1
        const tongSoPhanBangNhau = end / (between - 1)
        if (index === 1 || index === steps.length) {
            return 0
        }
        if (index === between) {
            return end
        }
        if (index < between) {
            return tongSoPhanBangNhau * (index - 1)
        } else {
            return tongSoPhanBangNhau * (index - (index - between) * 2 - 1)
        }
    }


    return (
        <div ref={wrapperRef} className='flex py-[1rem] flex-col items-center w-full'>
            <Introduce door={door} />
            <div className='mt-[3rem] flex flex-col relative w-full items-center gap-3'>
                {steps.map((step, index) => (
                    <Step door={door} left={true} margin={getPosition(index + 1)} key={index} />
                ))}
                <SpiritBeast left={false} />
            </div>
        </div>
    )
}

export default Gate