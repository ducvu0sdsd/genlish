import { authContext } from '@/context/AuthContext'
import { notifyContext, notifyType } from '@/context/NotifyContext'
import { practiceContext } from '@/context/PracticeContext'
import { shuffleArray } from '@/utils/other'
import { question1, question2, question3, question4, question5, question6 } from '@/utils/practice'
import React, { useContext, useEffect, useState } from 'react'

const Step = ({ margin, left, level, door, final = false }) => {
    const trangThai = {
        1: 'Chưa Học',
        2: 'Hiện Tại',
        3: 'Đã Học'
    }
    const { notifyHandler } = useContext(notifyContext)
    const { practiceHandler } = useContext(practiceContext)
    const { authData } = useContext(authContext)
    const [press, setPress] = useState(false)
    const [status, setStatus] = useState(trangThai[1])

    const handleAnimate = () => {
        if (status !== trangThai[1]) {
            const questions = shuffleArray([
                question1(door.beginner),
                question2(door.beginner),
                question3(door.beginner),
                question4(door.beginner),
                question5(door.beginner),
                question6(door.beginner),
            ])
            practiceHandler.setQuestions(questions)
            setPress(true)
            setTimeout(() => {
                setPress(false)
                notifyHandler.navigate('/practice')
            }, 200);
        } else {
            notifyHandler.notify(notifyType.WARNING, 'Hãy hoàn thành bài học trước để có thể kiểm tra')
        }
    }

    useEffect(() => {
        if (authData.user && door && level > 0) {
            const currentLevel = authData.user.study.levelVocabulary
            if (currentLevel.gate === door.gate.level && currentLevel.door === door.individual.door && currentLevel.level === level) {
                setStatus(trangThai[2])
            }
            if (currentLevel.gate >= door.gate.level && currentLevel.door >= door.individual.door && currentLevel.level > level) {
                setStatus(trangThai[3])
            }
        }
    }, [authData.user, door, level])

    return (
        <button onClick={() => handleAnimate()} style={left === false ? { marginLeft: `${margin}px` } : { marginRight: `${margin}px` }} className='relative z-50'>
            <div style={{ top: press ? '8px' : 0, backgroundColor: status === trangThai[1] ? '#e5e5e5' : status === trangThai[2] ? '#85c1e9' : '#58d68d' }} className='h-[65px] transition-all absolute z-10 w-[70px] rounded-full flex items-center justify-center'>
                {final ? (
                    <i style={{ color: status === trangThai[1] ? '#afafaf' : 'white' }} className="fa-solid fa-champagne-glasses text-[32px]"></i>
                ) : (
                    <i style={{ color: status === trangThai[1] ? '#afafaf' : 'white' }} className="fa-solid fa-star text-[32px]"></i>
                )}
            </div>
            <div style={{ backgroundColor: status === trangThai[1] ? '#b7b7b7' : status === trangThai[2] ? '#2e86c1' : '#229954' }} className='h-[65px] absolute top-[8px] w-[70px] rounded-full'></div>
            <div className='h-[78px] relative w-[80px]'>
                {status === trangThai[2] && (
                    <div className='animate-slight-move flex items-center gap-2 shadow-xl z-50 rounded-xl ml-[-140%] bg-[#85c1e9] px-2 py-2 w-[100px]'>
                        <img src={authData.user?.avatar} className='w-[40px] h-[40px] rounded-full' />
                        <span className='text-[white] font-bold text-[17px]'>Bạn</span>
                    </div>
                )}
            </div>
        </button >
    )
}

export default Step
