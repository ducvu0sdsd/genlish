'use client'
import ChangePassword from '@/components/ChangePassword'
import Logo from '@/components/Logo'
import Navbar from '@/components/Navbar'
import { authContext } from '@/context/AuthContext'
import { notifyContext, notifyType } from '@/context/NotifyContext'
import { api, TypeHTTP } from '@/utils/api'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
const HoSo = () => {
    const { authData, authHandler } = useContext(authContext);
    const { notifyHandler } = useContext(notifyContext)
    const [user, setUser] = useState(authData.user);

    useEffect(() => {

        setUser(authData.user);

    }, [authData.user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleUpdateUser = () => {
        api({ path: '/user/update', body: user, type: TypeHTTP.POST, sendToken: true }).then(res => {
            notifyHandler.notify(notifyType.SUCCESS, 'Update thành công')
            authHandler.setUser(user)
        })
    }
    const [change, setChange] = useState()
    return (
        <motion.div
            initial={{ x: 200 * -1 }}
            animate={{ x: 0 }}
            exit={{ x: 1920 * -1, transition: { duration: 0.2 } }}
        >
            <section className='h-screen w-full flex'>
                <Navbar />
                <div className='w-[100%] h-full justify-center translate-y-[-50px] gap-5 flex flex-col items-center'>
                    <img src={user?.avatar} alt="" className='col-span-2 w-[200px] aspect-square rounded-full' />
                    <section className='w-[100%] grid grid-cols-2 gap-[1rem] px-[12rem] justify-center items-center overflow-y-auto'>

                        <input
                            name="phone"
                            value={user?.phone}
                            onChange={handleChange}
                            className='rounded-lg text-[15px] focus:outline-none shadow-sm h-[45px] px-4 border border-[#e1e1e1]'
                            disabled
                        />
                        <input
                            name="fullName"
                            value={user?.fullName}
                            onChange={handleChange}
                            className='rounded-lg text-[15px] focus:outline-none shadow-sm h-[45px] px-4 border border-[#e1e1e1]'
                        />
                        <input
                            name="address"
                            value={user?.address}
                            onChange={handleChange}
                            className='rounded-lg text-[15px] focus:outline-none shadow-sm h-[45px] px-4 border border-[#e1e1e1]'
                        />

                        <select
                            name="gender"
                            onChange={handleChange}
                            className='rounded-lg text-[15px] focus:outline-none shadow-sm h-[45px] px-4 border border-[#e1e1e1]'
                        >

                            <option value={true}>Nam</option>
                            <option value={false}>Nữ</option>
                        </select>
                        <button onClick={() => handleUpdateUser()} className='rounded-lg text-[15px] h-[45px] focus:outline-0 hover:scale-[1.05] transition-all bg-blue-400 text-white'> Cập nhật thông tin người dùng</button>
                        <button onClick={() => setChange('d')} className='rounded-lg text-[15px] h-[45px] focus:outline-0 hover:scale-[1.05] transition-all bg-red-400 text-white'>Đổi mật khẩu</button>
                    </section>
                </div>
                <ChangePassword setChange={setChange} change={change} />
            </section>
        </motion.div>
    )
}

export default HoSo