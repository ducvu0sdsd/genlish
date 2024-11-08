'use client'
import QuanLyAi from '@/components/admin/QuanLyAi'
import QuanLyBroadcast from '@/components/admin/QuanLyBroadcast'
import QuanLyCua from '@/components/admin/QuanLyCua'
import QuanLyGiaoVien from '@/components/admin/QuanLyGiaoVien'
import QuanLyKhoaHoc from '@/components/admin/QuanLyKhoaHoc'
import QuanLyNguoiDung from '@/components/admin/QuanLyNguoiDung'
import Logo from '@/components/Logo'
import { authContext } from '@/context/AuthContext'
import { notifyContext } from '@/context/NotifyContext'
import { api, TypeHTTP } from '@/utils/api'
import { apiKey } from '@/utils/apikey'
import { handleFileUpload } from '@/utils/file'
import React, { useContext, useEffect, useState } from 'react'

const Admin = () => {

    const [gates, setGates] = useState([])
    const { notifyHandler } = useContext(notifyContext)
    const [broadcasts, setBroadCasts] = useState([])
    const { authData, authHandler } = useContext(authContext)
    const [option, setOption] = useState('a')

    const [ai, setAi] = useState({
        title: '',
        level: ''
    })

    const [broadcast, setBroadcast] = useState({
        vietnameseFile: null,
        englishFile: null,
        urlVideo: ''
    })

    const [cua, setCua] = useState({
        gate: null,
        individual: {
            title: '',
            image: '',
            numberOfTest: '',
            color: '',
            door: ''
        },
        beginner: [],
        elementary: [],
        intermediate: [],
        upperIntermediate: [],
        advanced: [],
    })

    useEffect(() => {
        api({ type: TypeHTTP.GET, path: '/broadcast/get-all', sendToken: false })
            .then(broadcasts => setBroadCasts(broadcasts))
        api({ type: TypeHTTP.GET, path: '/gate/get-all', sendToken: false })
            .then(gates => setGates(gates))
    }, [])

    const handleCreateBroadCast = async () => {
        const formData = new FormData()
        formData.append('strs', broadcast.englishFile)
        formData.append('strs', broadcast.vietnameseFile)
        const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${broadcast.urlVideo}&key=${apiKey}&part=snippet,contentDetails,statistics,status`)
        const title = res.data.items[0].snippet.title
        const thum = res.data.items[0].snippet.thumbnails.maxres.url
        const duration = formatDuration(parseISO8601Duration(res.data.items[0].contentDetails.duration)).replace('00:', '')
        const channelName = res.data.items[0].snippet.channelTitle
        formData.append('urlVideo', broadcast.urlVideo);
        formData.append('title', title)
        formData.append('thum', thum)
        formData.append('duration', duration)
        formData.append('channelName', channelName)
        api({ sendToken: false, type: TypeHTTP.POST, path: '/broadcast/save', body: formData })
            .then(broadcast => {
                setBroadCasts(prev => [...prev, broadcast])
                notifyHandler.notify(notifyType.SUCCESS, 'Thêm Thành Công')
            })
            .catch(error => {
                notifyHandler.notify(notifyType.FAIL, error.message)
            })
    }

    const handleDelete = (gateId) => {
        api({ type: TypeHTTP.DELETE, path: `/gate/delete/${gateId}`, sendToken: false, })
            .then((gate) => {

                setGates(gates.filter(item => item._id.toLowerCase() !== gate._id.toLowerCase()));
                notifyHandler.notify(notifyType.SUCCESS, 'Xóa thành công')
            })
    }

    const handleRemoveBroadcast = (id) => {
        api({ path: `/broadcast/delete/${id}`, type: TypeHTTP.DELETE, sendToken: false })
            .then(res => {
                setBroadCasts(broadcasts.filter(item => item._id.toLowerCase() !== res._id.toLowerCase()))
                notifyHandler.notify(notifyType.SUCCESS, 'Xóa thành công')

            })
    }

    const handleSignOut = () => {
        globalThis.localStorage.removeItem('accessToken')
        globalThis.localStorage.removeItem('refreshToken')
        authHandler.setUser()
        notifyHandler.navigate('/')
    }

    const handleFileChange = (e, type) => {
        const selectedFile = e.target.files[0]; // Lấy file đầu tiên từ danh sách file
        if (selectedFile) {
            if (type === 'vietnam') {
                setBroadcast({ ...broadcast, vietnameseFile: selectedFile })
            } else {
                setBroadcast({ ...broadcast, englishFile: selectedFile })
            }
        }
    };

    return (
        <section className='w-full h-screen flex'>
            <section className='w-[20%] px-[1.5rem] py-[1.25rem] border-r-[2px] border-[#f4f4f4]'>
                <Logo />
                <div className='flex flex-col gap-1 mt-[1rem]'>
                    <div onClick={() => setOption('a')} style={{ transition: '0.4s' }} className='flex hover:bg-[#ebebeb] rounded-lg h-[40px] px-2 w-[100%] items-center gap-2 cursor-pointer'>
                        <img src='/radio-menu.png' className='w-[32px]' />
                        <span className='font-semibold text-[#393939] text-[15px]'>Quản lý ải</span>
                    </div>
                    <div onClick={() => setOption('b')} style={{ transition: '0.4s' }} className='flex hover:bg-[#ebebeb] rounded-lg h-[40px] px-2 w-[100%] items-center gap-2 cursor-pointer'>
                        <img src='/radio-menu.png' className='w-[32px]' />
                        <span className='font-semibold text-[#393939] text-[15px]'>Quản lý cửa</span>
                    </div>
                    <div onClick={() => setOption('c')} style={{ transition: '0.4s' }} className='flex hover:bg-[#ebebeb] rounded-lg h-[40px] px-2 w-[100%] items-center gap-2 cursor-pointer'>
                        <img src='/radio-menu.png' className='w-[32px]' />
                        <span className='font-semibold text-[#393939] text-[15px]'>Quản lý broadcast</span>
                    </div>
                    <div onClick={() => setOption('d')} style={{ transition: '0.4s' }} className='flex hover:bg-[#ebebeb] rounded-lg h-[40px] px-2 w-[100%] items-center gap-2 cursor-pointer'>
                        <img src='/radio-menu.png' className='w-[32px]' />
                        <span className='font-semibold text-[#393939] text-[15px]'>Quản lý người dùng</span>
                    </div>
                    <div onClick={() => setOption('e')} style={{ transition: '0.4s' }} className='flex hover:bg-[#ebebeb] rounded-lg h-[40px] px-2 w-[100%] items-center gap-2 cursor-pointer'>
                        <img src='/radio-menu.png' className='w-[32px]' />
                        <span className='font-semibold text-[#393939] text-[15px]'>Quản lý giáo viên</span>
                    </div>
                    <div onClick={() => setOption('f')} style={{ transition: '0.4s' }} className='flex hover:bg-[#ebebeb] rounded-lg h-[40px] px-2 w-[100%] items-center gap-2 cursor-pointer'>
                        <img src='/radio-menu.png' className='w-[32px]' />
                        <span className='font-semibold text-[#393939] text-[15px]'>Quản lý Khóa Học</span>
                    </div>
                    <div onClick={() => handleSignOut()} style={{ transition: '0.4s' }} className='flex hover:bg-[#ebebeb] rounded-lg h-[40px] px-2 w-[100%] items-center gap-2 cursor-pointer'>
                        <img src='/logout-menu.png' className='w-[32px]' />
                        <span className='font-semibold text-[#393939] text-[15px]'>Đăng Xuất</span>
                    </div>
                </div>
            </section>
            <div className=' w-[80%] h-screen overflow-y-auto'>
                {
                    option === 'a' ? (
                        <QuanLyAi ai={ai} setAi={setAi} gates={gates} setGates={setGates} />
                    ) : option === 'b' ? (
                        <QuanLyCua cua={cua} setCua={setCua} gates={gates} />
                    ) : option === 'c' ? (
                        <QuanLyBroadcast broadcast={broadcast} broadcasts={broadcasts} />
                    ) : option === 'd' ? (
                        <QuanLyNguoiDung />
                    ) : option === 'e' ? (
                        <QuanLyGiaoVien />
                    ) : (
                        <QuanLyKhoaHoc />
                    )
                }
            </div>
        </section>
    )
}

export default Admin