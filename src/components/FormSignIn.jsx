'use client'
import { authContext } from '@/context/AuthContext'
import { notifyContext, notifyType } from '@/context/NotifyContext'
import { api, TypeHTTP } from '@/utils/api'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'

const FormSignIn = ({ visible, hidden }) => {
    const router = useRouter()
    const { authHandler } = useContext(authContext)
    const { notifyHandler } = useContext(notifyContext)

    const [info, setInfo] = useState({
        phone: '',
        password: ''
    })

    const handleSignIn = () => {
        notifyHandler.notify(notifyType.LOADING, 'Đang xác thực')
        if (info.phone === '') {

        }
        if (info.password === '') {

        }
        api({ type: TypeHTTP.POST, body: { phone: info.phone, password: info.password }, sendToken: false, path: '/auth/sign-in' })
            .then(res => {
                globalThis.localStorage.setItem('accessToken', res.tokens.accessToken)
                globalThis.localStorage.setItem('refreshToken', res.tokens.refreshToken)
                authHandler.setUser(res.user)
                if (res.user.statusSignUp === 7) {
                    router.push('/learn')
                } else {
                    router.push('/getting-started')
                }
                router.push('/getting-started')
                setTimeout(() => {
                    if (res.user.statusSignUp === 7) {
                        notifyHandler.notify(notifyType.SUCCESS, 'Đăng nhập thành công')
                    } else {
                        notifyHandler.notify(notifyType.WARNING, 'Hãy hoàn thành thông tin của bạn')
                    }
                    hidden()
                }, (1000));
            })
            .catch(error => {
                notifyHandler.notify(notifyType.FAIL, error.message)
            })
    }

    return (
        <section style={{ top: visible ? '0' : '100%', transition: '0.4s' }} className='z-[45] flex items-center justify-center fixed left-0 w-screen h-screen transition-all bg-[white]'>
            <button onClick={() => hidden()} className='text-[35px] absolute top-3 left-4 text-[#999]'><i className='bx bx-x' ></i></button>
            <button className="bg-[#149dff] absolute top-3 right-4 hover:scale-[1.06] transition-all text-[white] shadow-xl border-[1px] border-[#e4e4e4] font-bold text-[16px] w-[10%] py-[7px] rounded-lg">Đăng Ký</button>
            <div className='flex flex-col items-center gap-3 w-[450px]'>
                <span className='font-semibold text-[25px] text-[#262626]'>Đăng nhập</span>
                <input value={info.phone} onChange={e => setInfo({ ...info, phone: e.target.value })} className='rounded-lg w-[100%] text-[15px] focus:outline-0 shadow-sm h-[45px] px-[1rem] border-[1px] border-[#e1e1e1]' placeholder='Số Điện Thoại' />
                <input value={info.password} onChange={e => setInfo({ ...info, password: e.target.value })} type='password' className='rounded-lg w-[100%] text-[15px] focus:outline-0 shadow-sm h-[45px] px-[1rem] border-[1px] border-[#e1e1e1]' placeholder='Mật Khẩu' />
                <button onClick={() => handleSignIn()} className="bg-[#149dff] hover:scale-[1.06] transition-all text-[white] shadow-xl border-[1px] border-[#e4e4e4] font-bold text-[16px] w-[100%] py-[7px] rounded-lg">Đăng Nhập</button>
            </div>
        </section>
    )
}

export default FormSignIn