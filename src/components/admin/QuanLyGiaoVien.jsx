import { api, TypeHTTP } from '@/utils/api'
import { formatDate } from '@/utils/date'
import React, { useEffect, useState } from 'react'

const QuanLyGiaoVien = () => {

    const [users, setUsers] = useState([])
    const [userFilters, setUserFilters] = useState([])
    const [name, setName] = useState('')
    const [screen, setScreen] = useState(0)
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        api({ type: TypeHTTP.GET, path: '/user/get-all-teacher', sendToken: true })
            .then(res => setUsers(res))
    }, [])

    useEffect(() => {
        const filteredUsers = users.filter(user =>
            user.fullName.toLowerCase().includes(name.toLowerCase())
        )
        setUserFilters(filteredUsers)
    }, [name, users])

    return (
        <section style={{ marginLeft: `-${screen * 100}%` }} className='flex w-full h-[100%] transition-all'>
            <div className='flex flex-col h-full min-w-[100%] p-[1.5rem]'>
                <div className='flex justify-between'>
                    <h1 className='font-semibold text-[20px]'>Tất Cả Giáo Viên: {users.length}</h1>
                    <div className='flex items-center gap-2'>
                        {/* <button style={{ background: 'linear-gradient(to right, #3494e6, #ec6ead)' }} className='flex h-[37px] transition-all hover:scale-[1.05] items-center gap-2 px-4 py-2 rounded-lg'>
                            <i className="fa-solid fa-plus text-[white]"></i>
                            <span className='text-[white]'>Thêm giáo viên</span>
                        </button> */}
                        <input value={name} onChange={e => setName(e.target.value)} placeholder='Tìm giáo viên' className='text-[14px] px-2 h-[37px] w-[200px] rounded-md focus:outline-none border-[#c4c4c4] border-[1px]' />
                    </div>
                </div>
                {name === '' ? (
                    <div className='w-full grid grid-cols-3 gap-2 mt-3'>
                        {users.map((user, index) => (
                            <div onClick={() => {
                                setCurrentUser(user)
                                setScreen(1)
                            }} key={index} className='cursor-pointer transition-all hover:scale-[1.05] flex w-full rounded-lg bg-[#f0f0f0] relative gap-2 p-[10px]'>
                                <img src={user.avatar} className='rounded-full w-[50px] h-[50px]' />
                                <div className='flex flex-col gap-[2px]'>
                                    <span>{user.fullName}</span>
                                    <span className='text-[14px]'>Số lượng khóa học đã tạo: {user.courses.length}</span>
                                </div>
                                {user.courses.length == 0 && (
                                    <button className='absolute p-1 right-2 top-1 transition-all'>
                                        <i className="fa-regular fa-trash-can text-[#999] transition-all hover:text-[red]"></i>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='w-full grid grid-cols-3 gap-2 mt-3'>
                        {userFilters.map((user, index) => (
                            <div onClick={() => {
                                setCurrentUser(user)
                                setScreen(1)
                            }} key={index} className='flex w-full rounded-lg bg-[#f0f0f0] gap-2 p-[10px]'>
                                <img src={user.avatar} className='rounded-full w-[50px] h-[50px]' />
                                <div className='flex flex-col gap-[2px]'>
                                    <span>{user.fullName}</span>
                                    <span className='text-[14px]'>Số lượng khóa học đã tạo: {user.courses.length}</span>
                                </div>
                                {user.courses.length == 0 && (
                                    <button className='absolute p-1 right-2 top-1 transition-all'>
                                        <i className="fa-regular fa-trash-can text-[#999] transition-all hover:text-[red]"></i>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className='flex flex-col h-[100%] min-w-[100%] p-[1.5rem]'>
                {currentUser && (
                    <>
                        <div className='flex items-center'>
                            <i onClick={() => setScreen(0)} className='text-[#999] bx bx-chevron-left cursor-pointer text-[30px]' ></i>
                            <span className='font-semibold text-[#999] text-[15px]'>Quay về</span>
                        </div>
                        <div className='flex items-center w-full relative'>
                            <img src={currentUser.avatar} className='w-[100px] h-[100px] rounded-full' />
                            <div className='flex flex-col gap-1'>
                                <span className='text-[18px]'>{currentUser.fullName}</span>
                                <span className='text-[14px]'>Số lượng khóa học đã tạo: {currentUser.courses.length}</span>
                            </div>
                            {currentUser.courses.length == 0 && (
                                <button className='absolute p-1 right-2 top-[50%] translate-y-[-50%] transition-all'>
                                    <i className="fa-regular fa-trash-can text-[#999] transition-all hover:text-[red] text-[25px]"></i>
                                </button>
                            )}
                        </div>
                        <span className='text-[15px] font-semibold mt-[1rem]'>Tất Cả Khóa Học</span>
                        <div className='flex flex-col gap-2 h-[75%] overflow-y-auto'>
                            {currentUser.courses.length > 0 ? currentUser.courses.map((course, index) => (
                                <div key={index} className='flex cursor-pointer transition-all hover:bg-[#e4e4e4] items-center gap-2 relative px-[1rem] py-2 bg-[#f6f6f6] rounded-lg'>
                                    <img src={course.image} className='w-[80px] rounded-lg' />
                                    <div className='flex flex-col'>
                                        <span className='font-semibold text-[15px]'>{course.title}</span>
                                        <span className='text-[12px]'>by {course.teacher.fullName}</span>
                                    </div>
                                    <div className='flex flex-col absolute right-[1rem] top-[50%] translate-y-[-50%]'>
                                        <span className='text-[13px]'>{course.type === 'free' ? 'Miễn Phí' : 'Trả Phí'}</span>
                                        {course.type === 'pay' && (
                                            <span className='text-[12px]'>by {course.price}</span>
                                        )}
                                    </div>
                                </div>
                            )) : (
                                <span className='w-full mt-[1rem] text-center'>Hiện giáo viên chưa có khóa học </span>
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}

export default QuanLyGiaoVien