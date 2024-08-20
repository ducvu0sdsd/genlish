import { notifyContext } from '@/context/NotifyContext';
import { Button, Input } from '@material-tailwind/react';
import React, { useContext, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player';

const DetailBroadCast = ({ broadCast, setBroadCast }) => {
    const { notifyHandler } = useContext(notifyContext)
    const reactPlayerRef = useRef(null);
    const subRef = useRef()
    const titleRef = useRef()
    const [id, setId] = useState(0)
    const [top, setTop] = useState(0)

    const handleOnProgress = () => {
        if (reactPlayerRef.current) {
            const currentTime = reactPlayerRef.current.getCurrentTime()
            broadCast?.englishSubtitle.forEach((item, index) => {
                const i = index
                if (currentTime >= item.firstTime && currentTime <= item.lastTime) {
                    setId(i)
                    const currentSubEnglish = document.querySelector(`.sub-${index} .english`)
                    const currentSubVietnamese = document.querySelector(`.sub-${index} .vietnamese`)
                    currentSubEnglish.style.color = '#6dbaa8'
                    currentSubEnglish.style.scale = '1.05'
                    currentSubVietnamese.style.color = '#6dbaa8'
                    currentSubVietnamese.style.scale = '1.05'
                }
            })
        }
    }

    useEffect(() => {
        const currentSubEnglish = document.querySelector(`.sub-${id} .english`);
        if (currentSubEnglish && subRef.current) {
            if (id === 0) {
                const targetTop = titleRef.current.getBoundingClientRect().top;
                setTop(prev => prev + targetTop)
            } if (id === 1) {
                const targetTop = (document.querySelector(`.sub-${id - 1} .english`).offsetHeight + 48) * 2;
                setTop(prev => prev + targetTop)
            } else {
                const targetTop = document.querySelector(`.sub-${id - 1} .english`).offsetHeight + 48;
                setTop(prev => prev + targetTop)
            }
        }
    }, [id]);

    useEffect(() => {
        subRef.current.scrollTo({
            top: top,
            behavior: 'smooth'
        });
    }, [top])

    return (
        <div style={{ right: broadCast ? '0' : '-100%', transition: '0.5s' }} className='bg-[white] z-40 fixed top-0 w-[82%] gap-6 p-[1.5rem] h-screen overflow-y-auto'>
            <button onClick={() => setBroadCast()} className='text-[35px] absolute top-3 right-4 text-[#999]'><i className='bx bx-x' ></i></button>
            <h1 className='mb-4 font-poppins text-[24px] font-bold'>Test Overview</h1>
            <div className='flex gap-[2rem] w-full'>
                <div className='w-[60%]'>
                    <div className='w-full rounded-lg overflow-hidden h-[395px]'>
                        <ReactPlayer
                            config={{
                                youtube: {
                                    playerVars: {
                                        rel: 0, // Tắt gợi ý video liên quan 
                                        fs: 0,
                                    },
                                },
                                facebook: {
                                    appId: '12345'
                                }
                            }}
                            controls
                            url={'https://www.youtube.com/watch?v=' + broadCast?.urlVideo}
                            ref={reactPlayerRef}
                            width={'100%'}
                            height={'100%'}
                            progressInterval={1}
                            onProgress={() => handleOnProgress()}
                        />
                    </div>
                    <h2 className='font-poppins text-[21px] mt-4 font-semibold'>{broadCast?.title}</h2>
                    <h3 className='font-poppins mt-1 text-[18px]'><b>From </b>{broadCast?.channelName}</h3>
                </div>
                <div ref={subRef} className='w-[40%] h-[550px] border-l-[2px] border-[#efefef] overflow-auto pl-[2rem]'>
                    <span
                        ref={titleRef}
                        className='text-[22px] font-poppins font-semibold'
                    >{broadCast?.title}</span>
                    {broadCast?.englishSubtitle.map((item, index) => (
                        <p
                            className={`min-h-[50px] my-6 justify-center flex flex-col transition-all sub sub-${index}`}
                            key={index}>
                            <span className='font-poppins text-[19px] english'>{item.content}</span>
                            <span className='vietnamese'>{broadCast?.vietnameseSubtitle[index].content}</span>
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DetailBroadCast