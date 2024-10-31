import { api, TypeHTTP } from '@/utils/api'
import { formatDate } from '@/utils/date'
import React, { useEffect, useState } from 'react'

const QuanLyNguoiDung = () => {

    const [users, setUsers] = useState([])
    const [userFilters, setUserFilters] = useState([])
    const [name, setName] = useState('')

    useEffect(() => {
        api({ type: TypeHTTP.GET, path: '/user/get-all-student', sendToken: true })
            .then(res => setUsers(res))
    }, [])

    useEffect(() => {
        const filteredUsers = users.filter(user =>
            user.fullName.toLowerCase().includes(name.toLowerCase())
        )
        setUserFilters(filteredUsers)
    }, [name, users])

    return (
        <section className='flex flex-col h-screen p-[1.5rem]'>
            <div className='flex justify-between'>
                <h1 className='font-semibold text-[20px]'>Tất Cả Người Dùng: {users.length}</h1>
                <input value={name} onChange={e => setName(e.target.value)} placeholder='Tìm tên người dùng' className='text-[14px] px-2 h-[37px] w-[200px] rounded-md focus:outline-none border-[#c4c4c4] border-[1px]' />
            </div>
            {name === '' ? (
                <div className='w-full grid grid-cols-3 gap-2 mt-3'>
                    {users.map((user, index) => (
                        <div key={index} className='flex w-full rounded-lg bg-[#f0f0f0] gap-2 p-[10px]'>
                            <img src={user.avatar} className='rounded-full w-[50px] h-[50px]' />
                            <div className='flex flex-col gap-[2px]'>
                                <span>{user.fullName}</span>
                                <span className='text-[14px]'>Đã đăng ký vào {formatDate(user.createdAt)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='w-full grid grid-cols-3 gap-2 mt-3'>
                    {userFilters.map((user, index) => (
                        <div key={index} className='flex w-full rounded-lg bg-[#f0f0f0] gap-2 p-[10px]'>
                            <img src={user.avatar} className='rounded-full w-[50px] h-[50px]' />
                            <div className='flex flex-col gap-[2px]'>
                                <span>{user.fullName}</span>
                                <span className='text-[14px]'>Đã đăng ký vào {formatDate(user.createdAt)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}

export default QuanLyNguoiDung