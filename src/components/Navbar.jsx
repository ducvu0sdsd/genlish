import React, { useContext } from 'react'
import Logo from './Logo'
import { notifyContext } from '@/context/NotifyContext'
import { authContext } from '@/context/AuthContext'
import Link from 'next/link'

const Navbar = () => {

    const { notifyHandler } = useContext(notifyContext)
    const { authHandler } = useContext(authContext)

    const handleSignOut = () => {
        globalThis.localStorage.removeItem('accessToken')
        globalThis.localStorage.removeItem('refreshToken')
        authHandler.setUser()
        notifyHandler.navigate('/')
    }

    return (
        <section className='w-[18%] px-[1.5rem] py-[1.25rem] border-r-[2px] border-[#f4f4f4]'>
            <Logo />
            <div className='flex flex-col gap-2 mt-[1rem]'>
                <Link href={'/learn'}>
                    <div style={{ transition: '0.4s' }} className='flex hover:bg-[#ebebeb] rounded-lg h-[40px] px-2 w-[100%] items-center gap-4 cursor-pointer'>
                        <img src='/book-menu.png' className='w-[32px]' />
                        <span className='font-semibold text-[#d69898] text-[15px]'>Học Từ Vựng</span>
                    </div>
                </Link>
                <div style={{ transition: '0.4s' }} className='flex hover:bg-[#ebebeb] rounded-lg h-[40px] px-2 w-[100%] items-center gap-4 cursor-pointer'>
                    <img src='/glass-menu.png' className='w-[32px]' />
                    <span className='font-semibold text-[#393939] text-[15px]'>Tra Từ Vựng</span>
                </div>
                <Link href={'/broad-casts'}>
                    <div style={{ transition: '0.4s' }} className='flex hover:bg-[#ebebeb] rounded-lg h-[40px] px-2 w-[100%] items-center gap-4 cursor-pointer'>
                        <img src='/radio-menu.png' className='w-[32px]' />
                        <span className='font-semibold text-[#393939] text-[15px]'>Broadcast</span>
                    </div>
                </Link>
                <Link href={'/communicate-with-ai'}>
                    <div style={{ transition: '0.4s' }} className='flex hover:bg-[#ebebeb] rounded-lg h-[40px] px-2 w-[100%] items-center gap-4 cursor-pointer'>
                        <img src='/com-menu.png' className='w-[32px]' />
                        <span className='font-semibold text-[#393939] text-[15px]'>Giao Tiếp AI</span>
                    </div>
                </Link>
                <div style={{ transition: '0.4s' }} className='flex hover:bg-[#ebebeb] rounded-lg h-[40px] px-2 w-[100%] items-center gap-4 cursor-pointer'>
                    <img src='/person-menu.png' className='w-[32px]' />
                    <span className='font-semibold text-[#393939] text-[15px]'>Hồ Sơ</span>
                </div>
                <div style={{ transition: '0.4s' }} className='flex hover:bg-[#ebebeb] rounded-lg h-[40px] px-2 w-[100%] items-center gap-4 cursor-pointer'>
                    <img src='/setting-menu.png' className='w-[32px]' />
                    <span className='font-semibold text-[#393939] text-[15px]'>Cài Đặt</span>
                </div>
                <div onClick={() => handleSignOut()} style={{ transition: '0.4s' }} className='flex hover:bg-[#ebebeb] rounded-lg h-[40px] px-2 w-[100%] items-center gap-4 cursor-pointer'>
                    <img src='/logout-menu.png' className='w-[32px]' />
                    <span className='font-semibold text-[#393939] text-[15px]'>Đăng Xuất</span>
                </div>
            </div>
        </section>
    )
}

export default Navbar