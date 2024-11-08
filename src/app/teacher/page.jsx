'use client'


import ChangePassword from '@/components/ChangePassword'
import Logo from '@/components/Logo'
import ChiTietBaiHoc from '@/components/teacher/ChiTietBaiHoc'
import QLCacBaiHoc from '@/components/teacher/QLCacBaiHoc'
import ThongKeDoanhThu from '@/components/teacher/ThongKeDoanhThu'
import { authContext } from '@/context/AuthContext'
import { notifyContext, notifyType } from '@/context/NotifyContext'
import { api, TypeHTTP } from '@/utils/api'
import { handleFileUpload, handleImageUpload } from '@/utils/file'
import { formatDuration, parseISO8601Duration } from '@/utils/other'
import axios from 'axios'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'

const Teacher = () => {
    const [gates, setGates] = useState([])
    const { notifyHandler } = useContext(notifyContext)
    const [broadcasts, setBroadCasts] = useState([])
    const { authData, authHandler } = useContext(authContext)
    const [option, setOption] = useState('a')
    const [courses, setCourses] = useState([])
    const [currentCourse, setCurrentCourse] = useState()
    const [change, setChange] = useState()

    //data
    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [level, setLevel] = useState('')
    const [result, setResult] = useState('')
    const [type, setType] = useState('')

    useEffect(() => {
        if (authData.user?._id) {
            api({ type: TypeHTTP.GET, sendToken: true, path: `/course/get-by-teacher/${authData.user._id}` })
                .then(res => {
                    setCourses(res)
                })
        }
    }, [authData.user?._id])

    const handleSignOut = () => {
        globalThis.localStorage.removeItem('accessToken')
        globalThis.localStorage.removeItem('refreshToken')
        authHandler.setUser()
        notifyHandler.navigate('/')
    }

    const handleCreate = () => {
        const body = {
            image, title, description, price, level, result, type,
            teacher: {
                _id: authData.user._id,
                fullName: authData.user.fullName,
                avatar: authData.user.avatar
            },
            slug: title.toLowerCase().split(' ').join('-')
        }
        api({ type: TypeHTTP.POST, body, sendToken: true, path: '/course/create' })
            .then(res => {
                notifyHandler.notify(notifyType.SUCCESS, 'Tạo khóa học thành công, hãy chờ quản trị viên xét duyệt')
                setTimeout(() => {
                    notifyHandler.reload()
                }, (1000));
            })
            .catch(error => {
                notifyHandler.notify(notifyType.FAIL, error.message)
            })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        authHandler.setUser(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdateUser = () => {
        api({ path: '/user/update', body: authData.user, type: TypeHTTP.POST, sendToken: true }).then(res => {
            notifyHandler.notify(notifyType.SUCCESS, 'Update thành công')
            authHandler.setUser(res)
        })
    }

    return (
        <section className='w-full h-screen flex'>
            <section className='w-[20%] px-[1.5rem] py-[1.25rem] border-r-[2px] border-[#f4f4f4]'>
                <Logo />
                <div className='flex flex-col gap-2 mt-[1rem] w-full'>
                    <div onClick={() => setOption('a')} style={{ transition: '0.4s' }} className='flex hover:bg-[#ebebeb] rounded-lg h-[35px] py-2 px-2 w-[100%] items-center gap-4 cursor-pointer'>
                        <img src='/radio-menu.png' className='w-[32px]' />
                        <span className='font-semibold text-[#393939] text-[14px]'>Quản lý khóa học</span>
                    </div>
                    <div onClick={() => setOption('b')} style={{ transition: '0.4s' }} className='flex hover:bg-[#ebebeb] rounded-lg h-[35px] py-2 px-2 w-[100%] items-center gap-4 cursor-pointer'>
                        <img src='/radio-menu.png' className='w-[32px]' />
                        <span className='font-semibold text-[#393939] text-[14px]'>Quản lý các bài học</span>
                    </div>
                    <div onClick={() => setOption('d')} style={{ transition: '0.4s' }} className='flex hover:bg-[#ebebeb] rounded-lg h-[35px] py-2 px-2 w-[100%] items-center gap-4 cursor-pointer'>
                        <img src='/radio-menu.png' className='w-[32px]' />
                        <span className='font-semibold text-[#393939] text-[14px]'>Thống kê doanh thu</span>
                    </div>
                    <div onClick={() => setOption('c')} style={{ transition: '0.4s' }} className='flex hover:bg-[#ebebeb] rounded-lg h-[35px] py-2 px-2 w-[100%] items-center gap-4 cursor-pointer'>
                        <img src='/radio-menu.png' className='w-[32px]' />
                        <span className='font-semibold text-[#393939] text-[14px]'>Hồ Sơ</span>
                    </div>
                    <div onClick={() => handleSignOut()} style={{ transition: '0.4s' }} className='flex hover:bg-[#ebebeb] rounded-lg h-[35px] py-2 px-2 w-[100%] items-center gap-4 cursor-pointer'>
                        <img src='/logout-menu.png' className='w-[32px]' />
                        <span className='font-semibold text-[#393939] text-[14px]'>Đăng Xuất</span>
                    </div>
                </div>
            </section>
            <div className=' w-[80%] py-[1.5rem] h-screen overflow-y-auto'>
                {option === "a" ? (
                    <div className='w-full p-[1rem] flex flex-col gap-2 h-full'>
                        <span className='font-semibold text-[#393939] text-[18px]'>Quản Lý Khóa học</span>
                        <div className='grid grid-cols-3 gap-3 w-full'>
                            <input value={title} onChange={e => setTitle(e.target.value)} className='rounded-lg text-[15px] focus:outline-0 shadow-sm h-[45px] px-[1rem] border-[1px] border-[#e1e1e1]' placeholder='Title' />
                            <input value={price} onChange={e => setPrice(e.target.value)} className='rounded-lg text-[15px] focus:outline-0 shadow-sm h-[45px] px-[1rem] border-[1px] border-[#e1e1e1]' placeholder='Price' />
                            <div className='flex items-start overflow-hidden'>
                                <span>Image: </span>
                                <input onChange={(e) => handleImageUpload(e).then(res => setImage(res))} type='file' className='rounded-lg text-[15px] focus:outline-0 translate-y-[10px] shadow-sm h-[45px] px-[1rem]' />
                            </div>
                            <input value={level} onChange={e => setLevel(e.target.value)} className='rounded-lg text-[15px] focus:outline-0 shadow-sm h-[45px] px-[1rem] border-[1px] border-[#e1e1e1]' placeholder='Level' />
                            <select onChange={e => setType(e.target.value)} className='rounded-lg text-[15px] focus:outline-0 shadow-sm h-[45px] px-[1rem] border-[1px] border-[#e1e1e1]'>
                                <option value={null}>Hình Thức Phí</option>
                                <option value={'free'}>Miễn Phí</option>
                                <option value={'pay'}>Trả Phí</option>
                            </select>
                            <div />
                            <textarea value={result} onChange={e => setResult(e.target.value)} className='rounded-lg text-[15px] focus:outline-0 shadow-sm h-[100px] px-[1rem] border-[1px] border-[#e1e1e1] py-2' placeholder='Result' />
                            <textarea value={description} onChange={e => setDescription(e.target.value)} className='rounded-lg text-[15px] focus:outline-0 shadow-sm h-[100px] px-[1rem] border-[1px] border-[#e1e1e1] py-2' placeholder='Description' />
                            <div className='flex justify-end items-center'>
                                <button onClick={() => handleCreate()} className='hover:scale-[1.02] transition my-[0.25rem] font-semibold rounded-[10px] px-[2rem] py-[12px] text-[white] bg-[#241d49]'>Create</button>
                            </div>
                        </div>
                        {courses.length > 0 && (
                            <div className='w-full flex flex-col mt-[1rem] gap-2 h-[70%] overflow-auto'>
                                <span className='font-semibold'>Các Khóa Học Của {authData.user?.fullName}</span>
                                {courses.map((course, index) => (
                                    <div key={index} className='flex cursor-pointer transition-all hover:bg-[#e4e4e4] items-center gap-2 relative px-[1rem] py-2 bg-[#f6f6f6] rounded-lg'>
                                        <img src={course.image} className='w-[80px] rounded-lg' />
                                        <div className='flex flex-col'>
                                            <span className='font-semibold text-[15px]'>{course.title}</span>
                                            <span className='text-[13px]'>by {course.teacher.fullName}</span>
                                            <span style={{ color: course.status === false ? 'black' : 'blue' }} className='text-[13px]'>{course.status === false ? 'Chưa phê duyệt' : 'Đã phê duyệt'}</span>
                                        </div>
                                        <div className='flex flex-col absolute right-[1rem] top-[50%] translate-y-[-50%]'>
                                            <span className='text-[13px]'>{course.type === 'free' ? 'Miễn Phí' : 'Trả Phí'}</span>
                                            {course.type === 'pay' && (
                                                <span className='text-[12px]'>by {course.price}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}

                            </div>
                        )}
                    </div>
                ) : option === "b" ? (
                    <div className='flex w-full h-full'>
                        <div style={{ marginLeft: currentCourse ? '-100%' : '0%', transition: '0.5s' }} className='flex w-[100%] h-full'>
                            <QLCacBaiHoc setCurrentCourse={setCurrentCourse} courses={courses} />
                            <ChiTietBaiHoc setCurrentCourse={setCurrentCourse} course={currentCourse} />
                        </div>
                    </div>
                ) : option === "c" ? (
                    <div className='flex h-screen'>
                        <div className='w-[100%] h-full justify-center translate-y-[-50px] gap-5 flex flex-col items-center'>
                            <img src={authData.user?.avatar} alt="" className='col-span-2 w-[200px] aspect-square rounded-full' />
                            <section className='w-[100%] grid grid-cols-2 gap-[1rem] px-[12rem] justify-center items-center overflow-y-auto'>
                                <input
                                    name="phone"
                                    value={authData.user?.phone}
                                    onChange={handleChange}
                                    className='rounded-lg text-[15px] focus:outline-none shadow-sm h-[45px] px-4 border border-[#e1e1e1]'
                                    disabled
                                />
                                <input
                                    name="fullName"
                                    value={authData.user?.fullName}
                                    onChange={handleChange}
                                    className='rounded-lg text-[15px] focus:outline-none shadow-sm h-[45px] px-4 border border-[#e1e1e1]'
                                />
                                <input
                                    name="address"
                                    value={authData.user?.address}
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
                                <span className='font-semibold'>Thông tin thanh toán</span>
                                <div />
                                <input
                                    placeholder='Tên ngân hàng'
                                    value={authData.user?.bank?.bankName}
                                    onChange={e => authHandler.setUser(prevData => ({
                                        ...prevData,
                                        bank: { ...prevData.bank, bankName: e.target.value },
                                    }))}
                                    className='rounded-lg text-[15px] focus:outline-none shadow-sm h-[45px] px-4 border border-[#e1e1e1]'
                                />
                                <input
                                    placeholder='Tên tài khoản'
                                    value={authData.user?.bank?.accountName}
                                    onChange={e => authHandler.setUser(prevData => ({
                                        ...prevData,
                                        bank: { ...prevData.bank, accountName: e.target.value },
                                    }))}
                                    className='rounded-lg text-[15px] focus:outline-none shadow-sm h-[45px] px-4 border border-[#e1e1e1]'
                                />
                                <input
                                    placeholder='Số tài khoản'
                                    value={authData.user?.bank?.accountNumber}
                                    onChange={e => authHandler.setUser(prevData => ({
                                        ...prevData,
                                        bank: { ...prevData.bank, accountNumber: e.target.value },
                                    }))}
                                    className='rounded-lg text-[15px] focus:outline-none shadow-sm h-[45px] px-4 border border-[#e1e1e1]'
                                />
                                <div />
                                <button onClick={() => handleUpdateUser()} className='rounded-lg text-[15px] h-[45px] focus:outline-0 hover:scale-[1.05] transition-all bg-blue-400 text-white'> Cập nhật thông tin người dùng</button>
                                <button onClick={() => setChange('d')} className='rounded-lg text-[15px] h-[45px] focus:outline-0 hover:scale-[1.05] transition-all bg-red-400 text-white'>Đổi mật khẩu</button>
                            </section>
                        </div>
                        <ChangePassword setChange={setChange} change={change} />
                    </div>
                ) : (
                    <ThongKeDoanhThu />
                )}
            </div>
        </section >
    )
}

export default Teacher