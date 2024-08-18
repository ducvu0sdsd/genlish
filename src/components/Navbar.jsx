import React, { useContext } from 'react'
import Logo from './Logo'
import { notifyContext } from '@/context/NotifyContext'

const Navbar = () => {

    const { notifyHandler } = useContext(notifyContext)

    const handleSignOut = () => {
        globalThis.localStorage.removeItem('accessToken')
        globalThis.localStorage.removeItem('refreshToken')
        notifyHandler.navigate('/')
    }

    return (
        <section className='w-[20%] px-[1.5rem] py-[2rem] border-r-[2px] border-[#f4f4f4]'>
            <Logo />
            <div className='flex flex-col gap-2 mt-[2rem]'>
                <div style={{ transition: '0.4s' }} className='flex hover:bg-[#ebebeb] rounded-lg px-2 h-[50px] w-[100%] items-center gap-4 cursor-pointer'>
                    <img src='/book-menu.png' className='w-[37px]' />
                    <span className='font-bold text-[#393939] text-[16px]'>Học Từ Vựng</span>
                </div>
                <div style={{ transition: '0.4s' }} className='flex hover:bg-[#ebebeb] rounded-lg px-2 h-[50px] w-[100%] items-center gap-4 cursor-pointer'>
                    <img src='/glass-menu.png' className='w-[37px]' />
                    <span className='font-bold text-[#393939] text-[16px]'>Tra Từ Vựng</span>
                </div>
                <div style={{ transition: '0.4s' }} className='flex hover:bg-[#ebebeb] rounded-lg px-2 h-[50px] w-[100%] items-center gap-4 cursor-pointer'>
                    <img src='/radio-menu.png' className='w-[37px]' />
                    <span className='font-bold text-[#393939] text-[16px]'>Broadcast</span>
                </div>
                <div style={{ transition: '0.4s' }} className='flex hover:bg-[#ebebeb] rounded-lg px-2 h-[50px] w-[100%] items-center gap-4 cursor-pointer'>
                    <img src='/com-menu.png' className='w-[37px]' />
                    <span className='font-bold text-[#393939] text-[16px]'>Giao Tiếp AI</span>
                </div>
                <div style={{ transition: '0.4s' }} className='flex hover:bg-[#ebebeb] rounded-lg px-2 h-[50px] w-[100%] items-center gap-4 cursor-pointer'>
                    <img src='/person-menu.png' className='w-[37px]' />
                    <span className='font-bold text-[#393939] text-[16px]'>Hồ Sơ</span>
                </div>
                <div style={{ transition: '0.4s' }} className='flex hover:bg-[#ebebeb] rounded-lg px-2 h-[50px] w-[100%] items-center gap-4 cursor-pointer'>
                    <img src='/setting-menu.png' className='w-[37px]' />
                    <span className='font-bold text-[#393939] text-[16px]'>Cài Đặt</span>
                </div>
                <div onClick={() => handleSignOut()} style={{ transition: '0.4s' }} className='flex hover:bg-[#ebebeb] rounded-lg px-2 h-[50px] w-[100%] items-center gap-4 cursor-pointer'>
                    <img src='/setting-menu.png' className='w-[37px]' />
                    <span className='font-bold text-[#393939] text-[16px]'>Đăng Xuất</span>
                </div>
            </div>
        </section>
    )
}

export default Navbar