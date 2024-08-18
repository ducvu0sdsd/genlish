import React, { useContext, useState } from 'react'
import FormResult from './FormResult'
import { practiceContext } from '@/context/PracticeContext'

const Type0 = ({ question }) => {

    const { practiceData, practiceHandler } = useContext(practiceContext)

    return (
        <div className='w-[50%] flex flex-col gap-4'>
            <span className='text-[23px] font-semibold'>Chọn Nghĩa Đúng</span>
            <div className='flex items-center gap-4'>
                <img src='/logo.png' className='w-[100px]' />
                <div class="flex items-start transition-all">
                    <div class="relative max-w-xs px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg">
                        <span class="block">{question.question}</span>
                        <span class="absolute top-1/2 left-0 -translate-x-full -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[10px] border-r-blue-500"></span>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-2 w-full items-center py-2'>
                {question.options.map((option, index) => (
                    <button onClick={() => practiceHandler.setMyAnswer(option)} style={{ fontWeight: practiceData.myAnswer === option ? 'bold' : '400' }} key={index} className='w-[100%] bg-[white] border-[1px] border-[#dfdfdf] shadow-md py-3 rounded-md hover:scale-[1.05] transition-all'>{option}</button>
                ))}
            </div>
        </div>
    )
}

export default Type0