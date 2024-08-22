'use client'
import DetailBroadCast from '@/components/broadcasts/DetailBroadCast'
import Navbar from '@/components/Navbar'
import { api, TypeHTTP } from '@/utils/api'
import React, { useEffect, useState } from 'react'

const BroadCasts = () => {

    const [broadcasts, setBroadCasts] = useState([])
    const [currentBroadCast, setCurrentBroadCast] = useState()

    useEffect(() => {
        api({ type: TypeHTTP.GET, path: '/broadcast/get-all', sendToken: false })
            .then(broadcasts => setBroadCasts(broadcasts))
    }, [])

    return (
        <section className='w-full h-screen flex'>
            <Navbar />
            <div className='grid grid-cols-3 w-[82%] gap-6 p-[1.5rem] h-screen overflow-y-auto'>
                {broadcasts.map((broadCast, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrentBroadCast(broadCast)}
                        className='rounded-md cursor-pointer h-[250px] overflow-hidden flex flex-col shadow-xl bg-white'>
                        <img src={broadCast.thum} width={'100%'} />
                        <div className='py-1 flex justify-between'>
                            <span
                                className='font-poppins font-semibold text-[15px] my-2 px-2'>{broadCast.title}
                            </span>
                            <span
                                className='font-poppins font-semibold text-[15px] my-2 px-2'>
                                {broadCast.duration}
                            </span>
                        </div>
                    </div>
                ))}
                {broadcasts.map((broadCast, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrentBroadCast(broadCast)}
                        className='rounded-md cursor-pointer h-[250px] overflow-hidden flex flex-col shadow-xl bg-white'>
                        <img src={broadCast.thum} width={'100%'} />
                        <div className='py-1 flex justify-between'>
                            <span
                                className='font-poppins font-semibold text-[15px] my-2 px-2'>{broadCast.title}
                            </span>
                            <span
                                className='font-poppins font-semibold text-[15px] my-2 px-2'>
                                {broadCast.duration}
                            </span>
                        </div>
                    </div>
                ))}
                {broadcasts.map((broadCast, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrentBroadCast(broadCast)}
                        className='rounded-md cursor-pointer h-[250px] overflow-hidden flex flex-col shadow-xl bg-white'>
                        <img src={broadCast.thum} width={'100%'} />
                        <div className='py-1 flex justify-between'>
                            <span
                                className='font-poppins font-semibold text-[15px] my-2 px-2'>{broadCast.title}
                            </span>
                            <span
                                className='font-poppins font-semibold text-[15px] my-2 px-2'>
                                {broadCast.duration}
                            </span>
                        </div>
                    </div>
                ))}
                {broadcasts.map((broadCast, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrentBroadCast(broadCast)}
                        className='rounded-md cursor-pointer h-[250px] overflow-hidden flex flex-col shadow-xl bg-white'>
                        <img src={broadCast.thum} width={'100%'} />
                        <div className='py-1 flex justify-between'>
                            <span
                                className='font-poppins font-semibold text-[15px] my-2 px-2'>{broadCast.title}
                            </span>
                            <span
                                className='font-poppins font-semibold text-[15px] my-2 px-2'>
                                {broadCast.duration}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <DetailBroadCast broadCast={currentBroadCast} setBroadCast={setCurrentBroadCast} />
        </section>
    )
}

export default BroadCasts