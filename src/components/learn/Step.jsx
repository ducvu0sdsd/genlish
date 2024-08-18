import { notifyContext } from '@/context/NotifyContext'
import { practiceContext } from '@/context/PracticeContext'
import { question1, question2, question3, question4, question5 } from '@/utils/practice'
import React, { useContext, useState } from 'react'

const Step = ({ margin, left, status, door }) => {
    const { notifyHandler } = useContext(notifyContext)
    const { practiceHandler } = useContext(practiceContext)
    const [press, setPress] = useState(false)

    const handleAnimate = () => {
        const questions = [question1(door.beginner), question2(door.beginner)]
        practiceHandler.setQuestions(questions)
        setPress(true)
        setTimeout(() => {
            setPress(false)
            notifyHandler.navigate('/practice')
        }, 200);
    }

    return (
        <button onClick={() => handleAnimate()} style={left === true ? { marginLeft: `-${margin}px` } : { marginRight: `-${margin}px` }} className='relative'>
            <div style={{ top: press ? '8px' : 0 }} className='h-[65px] transition-all absolute z-10 w-[70px] rounded-full flex items-center justify-center bg-[#e5e5e5]'>
                <i className="fa-solid fa-star text-[32px] text-[#afafaf]"></i>
            </div>
            <div className='h-[65px] absolute top-[8px] w-[70px] rounded-full bg-[#b7b7b7]'></div>
            <div className='h-[78px] w-[80px]'>

            </div>
        </button>
    )
}

export default Step
