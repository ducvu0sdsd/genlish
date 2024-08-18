'use client'
import Processing from '@/components/getting-started/Processing'
import FormResult from '@/components/practice/FormResult'
import Type0 from '@/components/practice/Type0'
import { notifyContext } from '@/context/NotifyContext'
import { practiceContext } from '@/context/PracticeContext'
import Link from 'next/link'
import React, { useContext, useEffect, useRef, useState } from 'react'

const Practice = () => {
    const { practiceData } = useContext(practiceContext)
    const { notifyHandler } = useContext(notifyContext)
    const [questions, setQuestions] = useState([])
    let speakHandler = (voiceName, content) => { };
    const stepRef = useRef()

    useEffect(() => {
        if (practiceData.questions.length < 1) {
            notifyHandler.navigate('/learn')
        } else {
            setQuestions(practiceData.questions)
        }
    }, [practiceData.questions])

    // useEffect(() => {
    //     let voices = globalThis.window.speechSynthesis.getVoices();
    //     speakHandler = (voiceName, content) => {
    //         if (typeof globalThis.window !== 'undefined' && globalThis.window.speechSynthesis) {
    //             const utterance = new SpeechSynthesisUtterance(content);
    //             utterance.rate = 1;
    //             utterance.pitch = 1;
    //             utterance.volume = 1;
    //             voices = globalThis.window.speechSynthesis.getVoices();
    //             const selectedVoice = voices.find(voice => voice.name === voiceName);
    //             if (selectedVoice) {
    //                 utterance.voice = selectedVoice;
    //             }
    //             globalThis.window.speechSynthesis.speak(utterance);
    //         }
    //     };
    // }, []);


    return (
        <section className='py-[1.5rem] px-[3rem] flex flex-col items-center'>
            <div className='flex w-full items-center justify-center gap-3'>
                <i className='bx bx-left-arrow-alt text-[35px] text-[#929292]'></i>
                <Processing width={'80%'} height={'10px'} process={0} total={questions.length} />
            </div>
            <div className='w-full overflow-hidden'>
                <div style={{ marginLeft: stepRef.current ? stepRef.current.offsetWidth * practiceData.currentQuestion * -1 + 'px' : 0, transition: '0.5s' }} className='w-full flex'>
                    {questions.map((question, index) => (
                        <div key={index} ref={stepRef} className='min-w-full flex flex-col items-center'>
                            {question.type === 0 && (
                                <Type0 question={question} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <FormResult />
        </section>
    )
}

export default Practice