'use client'
import DetailBroadCast from '@/components/broadcasts/DetailBroadCast'
import Navbar from '@/components/Navbar'
import { api, TypeHTTP } from '@/utils/api'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
const BroadCasts = () => {

    const [broadcasts, setBroadCasts] = useState([])
    const [currentBroadCast, setCurrentBroadCast] = useState()

    useEffect(() => {
        api({ type: TypeHTTP.GET, path: '/broadcast/get-all', sendToken: false })
            .then(broadcasts => setBroadCasts(broadcasts))
    }, [])

    return (
        <motion.div
            initial={{ x: 200 * -1 }}
            animate={{ x: 0 }}
            exit={{ x: 1920 * -1, transition: { duration: 0.2 } }}
        >
            <section className='w-full h-screen flex'>
                <Navbar />
                <div className='flex flex-wrap w-[82%] gap-10 p-[1.5rem] overflow-y-auto'>
                    {broadcasts.map((broadCast, index) => (
                        <div
                            key={index}
                            onClick={() => setCurrentBroadCast(broadCast)}
                            className='rounded-md w-[300px] h-[240px] cursor-pointer overflow-hidden flex flex-col shadow-xl bg-white ransform scale-105 hover:scale-110 transition-transform duration-300 '>
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
        </motion.div>
    )
}

export default BroadCasts